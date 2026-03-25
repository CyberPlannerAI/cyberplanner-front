import ChatInterface from './components/ChatInterface'
import './App.css'

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#bbe4e6',
      padding: '20px'
    }}>
      <ChatInterface />
    </div>
  )
}

export default App
