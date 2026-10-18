import './App.css'
import { Header } from './App.jsx'

function Fotos() {
  return (
    <>
      <Header />

      <section className="photos-page">
        <div className="container">
          <h1>Fotos e Vídeos do Evento</h1>
          <p className="photos-subtitle">
            Comemoração de 10 anos do Grupo SAX CCB-ERUDITO-SACRO · 21 de novembro de 2026
          </p>

          <div className="photos-notice">
            <span className="photos-notice-icon">📸</span>
            <h2>Em breve por aqui</h2>
            <p>
              As fotos e os vídeos do encontro serão publicados nesta página após o evento.
              Guarde este endereço e volte para reviver os melhores momentos!
            </p>
          </div>

          <a className="btn" href="/">Conheça o evento</a>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-bottom">
            <p>&copy; 2026 Grupo SAX CCB-ERUDITO-SACRO. Todos os direitos reservados.</p>
            <p>
              WhatsApp:
              <a href="https://wa.me/5515997174741" target="_blank" rel="noopener noreferrer"> (15) 99717-4741</a> (Giancarlo) |
              <a href="https://wa.me/5511941743352" target="_blank" rel="noopener noreferrer"> (11) 94174-3352</a> (José de Carvalho)
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Fotos
