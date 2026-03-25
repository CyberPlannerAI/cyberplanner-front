import { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import './ChatInterface.css';
import { API_CONFIG } from '../config/api';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Olá! Sou o seu Gestor de Tempo. Como posso organizar sua rotina hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const nextIdRef = useRef(2);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: nextIdRef.current++,
      type: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Adicionar mensagem de carregamento
    const loadingId = nextIdRef.current++;
    setMessages(prev => [...prev, {
      id: loadingId,
      type: 'ai',
      text: 'O CyberPlanner está analisando...'
    }]);
    setIsLoading(true);

    try {
      const response = await fetch(API_CONFIG.chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: inputValue, modo: 'gestor' })
      });

      const data = await response.json();
      
      // Remover mensagem de carregamento
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      // Formatar resposta com markdown
      const respostaFormatada = marked.parse(data.resposta);

      // Adicionar resposta da IA
      setMessages(prev => [...prev, {
        id: nextIdRef.current++,
        type: 'ai',
        text: respostaFormatada,
        isHtml: true
      }]);
    } catch (error) {
      console.error('Erro:', error);
      
      // Remover mensagem de carregamento
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      // Adicionar mensagem de erro
      setMessages(prev => [...prev, {
        id: nextIdRef.current++,
        type: 'ai',
        text: 'Erro ao conectar com a API. O servidor (Uvicorn) está ligado?',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="header">CyberPlanner - Gestor IA</div>
      
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message ${msg.type === 'user' ? 'user-msg' : 'ai-msg'} ${msg.isError ? 'error-msg' : ''}`}
          >
            {msg.isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          id="user-input"
          placeholder="Ex: Tenho aula até as 12h e academia."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
