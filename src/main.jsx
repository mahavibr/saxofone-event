import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Fotos from './Fotos.jsx'
import Partituras from './Partituras.jsx'
import QRCode from './QRCode.jsx'
import Form from './Form.jsx'
import Admin from './Admin.jsx'

const path = window.location.pathname.replace(/\/+$/, '')

function Root() {
  if (path === '/fotos') return <Fotos />
  if (path === '/partituras') return <Partituras />
  if (path === '/qrcode') return <QRCode />
  if (path === '/form') return <Form />
  if (path === '/admin') return <Admin />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
