import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Fotos from './Fotos.jsx'

const isFotos = window.location.pathname.replace(/\/+$/, '') === '/fotos'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isFotos ? <Fotos /> : <App />}
  </StrictMode>,
)
