import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/baloo-2'
import './estilos/base.css'
import App from './App.jsx'
import { NOME_JOGO } from './config.js'

document.title = NOME_JOGO

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
