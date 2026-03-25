# CyberPlanner Front

Interface web do CyberPlanner para conversar com o Gestor IA e organizar rotina, tarefas e compromissos.

## Tecnologias

- React 19
- Vite
- Marked (renderizacao de markdown nas respostas)
- ESLint
- GitHub Pages (`gh-pages`)

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Como rodar localmente

1. Clone o repositorio:

```bash
git clone https://github.com/CyberPlannerAI/cyberplanner-front.git
cd cyberplanner-front
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie o arquivo de ambiente local:

```bash
cp .env.example .env
```

4. Ajuste a URL da API no `.env`:

```env
VITE_API_URL=https://cyberplanner-back.onrender.com
```

5. Rode o projeto:

```bash
npm run dev
```

6. Abra no navegador (normalmente):

```text
http://localhost:5173
```

## Configuracao da API

A URL da API esta centralizada em `src/config/api.js`.

- Variavel principal: `VITE_API_URL`
- Endpoint de chat utilizado no front: `${VITE_API_URL}/chat`

Exemplo:

```env
VITE_API_URL=https://cyberplanner-back.onrender.com
```

Se `VITE_API_URL` nao for definida, o projeto usa o fallback configurado em `src/config/api.js`.

## Scripts disponiveis

- `npm run dev`: sobe o ambiente de desenvolvimento
- `npm run build`: gera build de producao na pasta `dist`
- `npm run preview`: serve a build localmente para validacao
- `npm run lint`: executa verificacao de lint
- `npm run deploy`: publica a pasta `dist` no GitHub Pages

## Publicar no GitHub Pages (passo a passo)

Este projeto ja esta configurado com:

- `homepage` no `package.json`
- script de deploy com `gh-pages`

Siga este fluxo:

1. Garanta que todas as alteracoes estejam commitadas na branch principal:

```bash
git status
git add .
git commit -m "feat: sua descricao"
git push origin main
```

2. Gere a build de producao:

```bash
npm run build
```

3. Publique no GitHub Pages:

```bash
npm run deploy
```

4. No GitHub, confirme em `Settings > Pages`:

- Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`

5. Acesse a URL publicada:

```text
https://cyberplannerai.github.io/cyberplanner-front/
```

## Fluxo recomendado para novas modificacoes

Sempre que fizer novas alteracoes no front:

1. Teste localmente:

```bash
npm run dev
```

2. Valide build:

```bash
npm run build
```

3. Publique a nova versao:

```bash
npm run deploy
```

## Estrutura principal

```text
src/
	components/
		ChatInterface.jsx
	config/
		api.js
```

## Observacoes importantes

- Variaveis `VITE_*` sao incorporadas no build e ficam visiveis no front-end.
- Nao coloque segredos no `.env` deste projeto (tokens privados, chaves secretas, etc.).
