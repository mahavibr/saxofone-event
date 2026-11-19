import { useState } from 'react'
import './App.css'
import { Header } from './App.jsx'

// Imagens das vozes
import imgSoprano from './assets/partituras/img_sax/soprano.jpeg'
import imgAlto from './assets/partituras/img_sax/alto.jpeg'
import imgTenor from './assets/partituras/img_sax/tenor.jpeg'
import imgBaritono from './assets/partituras/img_sax/baritono.jpeg'
import imgBaixo from './assets/partituras/img_sax/baixo.jpeg'

// PDFs - A Deus Nosso Salvador
import adnsSoprano from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR SOPRANO.pdf'
import adnsAlto1 from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR ALTO 1.pdf'
import adnsAlto2 from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR ALTO 2.pdf'
import adnsAlto3 from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR ALTO 3.pdf'
import adnsTenor from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR TENOR.pdf'
import adnsBaritono from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR BARÍTONO.pdf'
import adnsBaixo from './assets/partituras/A DEUS NOSSO SALVADOR/A DEUS NOSSO SALVADOR BAIXO.pdf'

// PDFs - Ao Entardecer
import aeSoprano from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Soprano.pdf'
import aeAlto1 from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Alto_1.pdf'
import aeAlto2 from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Alto_2.pdf'
import aeAlto3 from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Alto_3.pdf'
import aeTenor from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Tenor.pdf'
import aeBaritono from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Barítono.pdf'
import aeBaixo from './assets/partituras/AO ENTARDECER/Ao Entardecer-Saxofone_Baixo.pdf'

// PDFs - Castelo Forte
import cfSoprano from './assets/partituras/CASTELO FORTE/CASTELO FORTE SOPRANO.pdf'
import cfAlto1 from './assets/partituras/CASTELO FORTE/CASTELO FORTE ALTO 1.pdf'
import cfAlto2 from './assets/partituras/CASTELO FORTE/CASTELO FORTE ALTO 2.pdf'
import cfAlto3 from './assets/partituras/CASTELO FORTE/CASTELO FORTE ALTO 3.pdf'
import cfTenor from './assets/partituras/CASTELO FORTE/CASTELO FORTE TENOR.pdf'
import cfBaritono from './assets/partituras/CASTELO FORTE/CASTELO FORTE BARITONO.pdf'
import cfBaixo from './assets/partituras/CASTELO FORTE/CASTELO FORTE BAIXO.pdf'

// PDFs - Coral Bach
import cbSoprano from './assets/partituras/BACH/Coral Bach 1 -Saxofone soprano.pdf'
import cbAlto from './assets/partituras/BACH/Coral Bach 1 - Saxofone alto.pdf'
import cbTenor from './assets/partituras/BACH/Coral Bach 1 - Saxofone tenor.pdf'
import cbBaritono from './assets/partituras/BACH/Coral Bach 1 - Saxofone barítono.pdf'
import cbBaixo from './assets/partituras/BACH/Coral Bach 1 - Saxofone baixo.pdf'

// PDFs - Holy, Holy, Holy
import hhhSoprano from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-SOPRANO.pdf'
import hhhAlto1 from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-ALTO 1.pdf'
import hhhAlto2 from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-ALTO 2.pdf'
import hhhAlto3 from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-ALTO 3.pdf'
import hhhTenor from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-TENOR.pdf'
import hhhBaritono from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-BARITONO.pdf'
import hhhBaixo from './assets/partituras/HOLY, HOLY, HOLY/Holy, Holy, Holy-BAIXO.pdf'

const pecas = [
  {
    id: 'a-deus-nosso-salvador',
    titulo: 'A Deus Nosso Salvador',
    subtitulo: 'Composição para 7 vozes',
    naipes: [
      { nome: 'Soprano', img: imgSoprano, pdf: adnsSoprano, download: 'A Deus Nosso Salvador - Sax Soprano.pdf' },
      { nome: 'Alto - Voz 1', img: imgAlto, pdf: adnsAlto1, download: 'A Deus Nosso Salvador - Sax Alto 1.pdf' },
      { nome: 'Alto - Voz 2', img: imgAlto, pdf: adnsAlto2, download: 'A Deus Nosso Salvador - Sax Alto 2.pdf' },
      { nome: 'Alto - Voz 3', img: imgAlto, pdf: adnsAlto3, download: 'A Deus Nosso Salvador - Sax Alto 3.pdf' },
      { nome: 'Tenor', img: imgTenor, pdf: adnsTenor, download: 'A Deus Nosso Salvador - Sax Tenor.pdf' },
      { nome: 'Barítono', img: imgBaritono, pdf: adnsBaritono, download: 'A Deus Nosso Salvador - Sax Barítono.pdf' },
      { nome: 'Baixo', img: imgBaixo, pdf: adnsBaixo, download: 'A Deus Nosso Salvador - Sax Baixo.pdf' },
    ],
  },
  {
    id: 'ao-entardecer',
    titulo: 'Ao Entardecer',
    subtitulo: 'Hino "Eventide" (Comigo Habita) · 7 vozes',
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
    id: 'castelo-forte',
    titulo: 'Castelo Forte',
    subtitulo: 'Hino "Castelo Forte é o Nosso Deus" · 7 vozes',
    naipes: [
      { nome: 'Soprano', img: imgSoprano, pdf: cfSoprano, download: 'Castelo Forte - Sax Soprano.pdf' },
      { nome: 'Alto - Voz 1', img: imgAlto, pdf: cfAlto1, download: 'Castelo Forte - Sax Alto 1.pdf' },
      { nome: 'Alto - Voz 2', img: imgAlto, pdf: cfAlto2, download: 'Castelo Forte - Sax Alto 2.pdf' },
      { nome: 'Alto - Voz 3', img: imgAlto, pdf: cfAlto3, download: 'Castelo Forte - Sax Alto 3.pdf' },
      { nome: 'Tenor', img: imgTenor, pdf: cfTenor, download: 'Castelo Forte - Sax Tenor.pdf' },
      { nome: 'Barítono', img: imgBaritono, pdf: cfBaritono, download: 'Castelo Forte - Sax Barítono.pdf' },
      { nome: 'Baixo', img: imgBaixo, pdf: cfBaixo, download: 'Castelo Forte - Sax Baixo.pdf' },
    ],
  },
  {
    id: 'coral-bach',
    titulo: 'Coral Bach',
    subtitulo: 'Coral de J. S. Bach · 5 vozes',
    naipes: [
      { nome: 'Soprano', img: imgSoprano, pdf: cbSoprano, download: 'Coral Bach 1 - Sax Soprano.pdf' },
      { nome: 'Alto', img: imgAlto, pdf: cbAlto, download: 'Coral Bach 1 - Sax Alto.pdf' },
      { nome: 'Tenor', img: imgTenor, pdf: cbTenor, download: 'Coral Bach 1 - Sax Tenor.pdf' },
      { nome: 'Barítono', img: imgBaritono, pdf: cbBaritono, download: 'Coral Bach 1 - Sax Barítono.pdf' },
      { nome: 'Baixo', img: imgBaixo, pdf: cbBaixo, download: 'Coral Bach 1 - Sax Baixo.pdf' },
    ],
  },
  {
    id: 'holy-holy-holy',
    titulo: 'Holy, Holy, Holy',
    subtitulo: 'Hino "Santo! Santo! Santo!" · 7 vozes',
    naipes: [
      { nome: 'Soprano', img: imgSoprano, pdf: hhhSoprano, download: 'Holy, Holy, Holy - Sax Soprano.pdf' },
      { nome: 'Alto - Voz 1', img: imgAlto, pdf: hhhAlto1, download: 'Holy, Holy, Holy - Sax Alto 1.pdf' },
      { nome: 'Alto - Voz 2', img: imgAlto, pdf: hhhAlto2, download: 'Holy, Holy, Holy - Sax Alto 2.pdf' },
      { nome: 'Alto - Voz 3', img: imgAlto, pdf: hhhAlto3, download: 'Holy, Holy, Holy - Sax Alto 3.pdf' },
      { nome: 'Tenor', img: imgTenor, pdf: hhhTenor, download: 'Holy, Holy, Holy - Sax Tenor.pdf' },
      { nome: 'Barítono', img: imgBaritono, pdf: hhhBaritono, download: 'Holy, Holy, Holy - Sax Barítono.pdf' },
      { nome: 'Baixo', img: imgBaixo, pdf: hhhBaixo, download: 'Holy, Holy, Holy - Sax Baixo.pdf' },
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
                {peca.grade && (
                  <a
                    className="btn grade-btn"
                    href={peca.grade.pdf}
                    download={peca.grade.nome}
                  >
                    ⬇ Baixar grade completa
                  </a>
                )}
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
