import './App.css'
import { QRCodeSVG } from 'qrcode.react'
import { Header } from './App.jsx'

const WHATSAPP_NUMERO = '5511941743352'
const MENSAGEM = 'Estive no Evento de Sax e quero entrar no grupo Sax Erudito Sacro.'
const LINK = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(MENSAGEM)}`

export default function QRCode() {
  return (
    <>
      <Header />
      <section className="partituras-page qrcode-page">
        <div className="container">
        <h1>Sax Erudito Sacro</h1>
        <p className="partituras-subtitle">
          Aponte a câmera do celular para o QR Code e entre no grupo pelo WhatsApp.
        </p>
        <a className="qrcode-box" href={LINK} target="_blank" rel="noreferrer">
          <QRCodeSVG value={LINK} size={256} marginSize={2} level="M" />
        </a>
        <p className="qrcode-msg">“{MENSAGEM}”</p>
        <a className="qrcode-link" href={LINK} target="_blank" rel="noreferrer">
          Abrir no WhatsApp
        </a>
        </div>
      </section>
    </>
  )
}
