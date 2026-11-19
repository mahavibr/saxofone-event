import { useState } from 'react'
import './App.css'
import { Header } from './App.jsx'

// Imagens dos naipes
import imgSoprano from './assets/partituras/img_sax/soprano.jpeg'
import imgAlto from './assets/partituras/img_sax/alto.jpeg'
import imgTenor from './assets/partituras/img_sax/tenor.jpeg'
import imgBaritono from './assets/partituras/img_sax/baritono.jpeg'
import imgBaixo from './assets/partituras/img_sax/baixo.jpeg'

// PDFs - Ao Entardecer
import aeGrade from './assets/partituras/Ao Entardecer/ao-entardecer-grade.pdf'
import aeSoprano from './assets/partituras/Ao Entardecer/ao-entardecer-soprano.pdf'
import aeAlto1 from './assets/partituras/Ao Entardecer/ao-entardecer-alto-1.pdf'
import aeAlto2 from './assets/partituras/Ao Entardecer/ao-entardecer-alto-2.pdf'
import aeAlto3 from './assets/partituras/Ao Entardecer/ao-entardecer-alto-3.pdf'
import aeTenor from './assets/partituras/Ao Entardecer/ao-entardecer-tenor.pdf'
import aeBaritono from './assets/partituras/Ao Entardecer/ao-entardecer-baritono.pdf'
import aeBaixo from './assets/partituras/Ao Entardecer/ao-entardecer-baixo.pdf'

// PDFs - Coral Bach 1
import cbGrade from './assets/partituras/Coral Bach 1/coral-bach-1-grade.pdf'
import cbSoprano from './assets/partituras/Coral Bach 1/coral-bach-1-soprano.pdf'
import cbAlto from './assets/partituras/Coral Bach 1/coral-bach-1-alto.pdf'
import cbTenor from './assets/partituras/Coral Bach 1/coral-bach-1-tenor.pdf'
import cbBaritono from './assets/partituras/Coral Bach 1/coral-bach-1-baritono.pdf'
import cbBaixo from './assets/partituras/Coral Bach 1/coral-bach-1-baixo.pdf'

const pecas = [
  {
    id: 'ao-entardecer',
    titulo: 'Ao Entardecer',
    subtitulo: 'Hino "Eventide" (Comigo Habita) · 7 vozes',
    grade: { pdf: aeGrade, nome: 'Ao Entardecer - Grade.pdf' },
    naipes: [
      { nome: 'Soprano', img: imgSoprano, pdf: aeSoprano, download: 'Ao Entardecer - Sax Soprano.pdf' },
      { nome: 'Alto - Voz 1', img: imgAlto, pdf: aeAlto1, download: 'Ao Entardecer - Sax Alto 1.pdf' },
      { nome: 'Alto - Voz 2', img: imgAlto, pdf: aeAlto2, download: 'Ao Entardecer - Sax Alto 2.pdf' },
      { nome: 'Alto - Voz 3', img: imgAlto, pdf: aeAlto3, download: 'Ao Entardecer - Sax Alto 3.pdf' },
      { nome: 'Tenor', img: imgTenor, pdf: aeTenor, download: 'Ao Entardecer - Sax Tenor.pdf' },
      { nome: 'Barítono', img: imgBaritono, pdf: aeBaritono, download: 'Ao Entardecer - Sax Barítono.pdf' },
      { nome: 'Baixo', img: imgBaixo, pdf: aeBaixo, download: 'Ao Entardecer - Sax Baixo.pdf' },
    ],
  },
  {
    id: 'coral-bach',
    titulo: 'Coral Bach',
    subtitulo: 'Coral de J. S. Bach · 5 vozes',
    grade: { pdf: cbGrade, nome: 'Coral Bach 1 - Grade.pdf' },
    naipes: [
      { nome: 'Soprano', img: imgSoprano, pdf: cbSoprano, download: 'Coral Bach 1 - Sax Soprano.pdf' },
      { nome: 'Alto', img: imgAlto, pdf: cbAlto, download: 'Coral Bach 1 - Sax Alto.pdf' },
      { nome: 'Tenor', img: imgTenor, pdf: cbTenor, download: 'Coral Bach 1 - Sax Tenor.pdf' },
      { nome: 'Barítono', img: imgBaritono, pdf: cbBaritono, download: 'Coral Bach 1 - Sax Barítono.pdf' },
      { nome: 'Baixo', img: imgBaixo, pdf: cbBaixo, download: 'Coral Bach 1 - Sax Baixo.pdf' },
    ],
  },
]

function Partituras() {
  const [pecaAtiva, setPecaAtiva] = useState(null)
  const peca = pecas.find((p) => p.id === pecaAtiva) || null

  return (
    <>
      <Header />

      <section className="partituras-page">
        <div className="container">
          <h1>Partituras</h1>
          <p className="partituras-subtitle">
            Escolha uma peça e baixe a partitura da sua voz.
          </p>

          {!peca && (
            <div className="pecas-grid">
              {pecas.map((p) => (
                <button
                  key={p.id}
                  className="peca-card"
                  onClick={() => setPecaAtiva(p.id)}
                >
                  <span className="peca-card-icon">🎼</span>
                  <h2>{p.titulo}</h2>
                  <p>{p.subtitulo}</p>
                  <span className="peca-card-cta">Ver vozes →</span>
                </button>
              ))}
            </div>
          )}

          {peca && (
            <div className="naipes-wrap">
              <button className="voltar-btn" onClick={() => setPecaAtiva(null)}>
                ← Voltar às peças
              </button>

              <div className="naipes-header">
                <h2>{peca.titulo}</h2>
                <p>{peca.subtitulo}</p>
                <a
                  className="btn grade-btn"
                  href={peca.grade.pdf}
                  download={peca.grade.nome}
                >
                  ⬇ Baixar grade completa
                </a>
              </div>

              <p className="naipes-hint">Clique na voz para baixar o PDF.</p>

              <div className="naipes-grid">
                {peca.naipes.map((n) => (
                  <a
                    key={n.download}
                    className="naipe-card"
                    href={n.pdf}
                    download={n.download}
                    title={`Baixar ${n.nome}`}
                  >
                    <div className="naipe-img-wrap">
                      <img src={n.img} alt={`Saxofone ${n.nome}`} loading="lazy" />
                      <span className="naipe-download-badge">⬇ PDF</span>
                    </div>
                    <span className="naipe-nome">{n.nome}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <a className="btn btn-outline voltar-evento" href="/">
            Voltar ao evento
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-bottom">
            <p>&copy; 2026 Grupo Sax Erudito Sacro. Todos os direitos reservados.</p>
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

export default Partituras
