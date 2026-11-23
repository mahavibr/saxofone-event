import './App.css'
import { useEffect, useState, useCallback } from 'react'
import { zip } from 'fflate'
import { Header } from './App.jsx'
import FOTOS from './fotos-manifest.json'
import MATERIAIS from './materiais-manifest.json'

const tamanho = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1).replace('.', ',')} MB` : `${Math.round(b / 1024)} KB`)

function Materiais() {
  return (
    <div className="materiais">
      <h2>Materiais do Encontro</h2>
      <p className="materiais-sub">Apresentações dos palestrantes para baixar e estudar com calma.</p>
      {MATERIAIS.map((g) => (
        <div key={g.autor} className="materiais-grupo">
          <h3>{g.autor}</h3>
          <div className="materiais-lista">
            {g.itens.map((it) => (
              <div key={it.titulo} className="material-card">
                <span className="material-icone" aria-hidden="true">📄</span>
                <span className="material-titulo">{it.titulo}</span>
                <div className="material-acoes">
                  {it.arquivos.map((a) => (
                    <a key={a.url} className={`gallery-btn${a.formato === 'pdf' ? ' gallery-btn-primary' : ''}`} href={a.url} download={a.nome}>
                      Baixar {a.formato.toUpperCase()} <small>({tamanho(a.bytes)})</small>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Fotos() {
  const [current, setCurrent] = useState(null)
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const [zipping, setZipping] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggle = (name) => {
    const next = new Set(selected)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    setSelected(next)
  }

  const step = useCallback((d) => setCurrent((c) => (c === null ? c : (c + d + FOTOS.length) % FOTOS.length)), [])

  useEffect(() => {
    if (current === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setCurrent(null)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [current, step])

  async function downloadZip(names) {
    setZipping(true)
    setProgress(0)
    try {
      const files = {}
      let done = 0
      for (let i = 0; i < names.length; i += 6) {
        await Promise.all(names.slice(i, i + 6).map(async (n) => {
          const buf = await (await fetch(`/fotos/full/${n}`)).arrayBuffer()
          files[n] = [new Uint8Array(buf), { level: 0 }]
          setProgress(Math.round((++done / names.length) * 100))
        }))
      }
      const data = await new Promise((res, rej) => zip(files, (err, d) => (err ? rej(err) : res(d))))
      const url = URL.createObjectURL(new Blob([data], { type: 'application/zip' }))
      const a = document.createElement('a')
      a.href = url
      a.download = 'fotos-evento-10-anos-sax-erudito-sacro.zip'
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    } catch {
      alert('Não foi possível gerar o ZIP. Tente novamente.')
    }
    setZipping(false)
  }

  return (
    <>
      <Header />

      <section className="photos-page">
        <div className="container">
          <h1>Fotos e Materiais</h1>
          <p className="photos-subtitle">
            Comemoração de 10 anos do Grupo Sax Erudito Sacro · 21 de novembro de 2026
          </p>

          <Materiais />

          <h2 className="fotos-titulo">Fotos do Evento</h2>
          <div className="gallery-toolbar">
            <span className="gallery-count">
              {selectMode && selected.size > 0
                ? `${selected.size} selecionada(s)`
                : `${FOTOS.length} fotos`}
            </span>
            <div className="gallery-actions">
              {selectMode && (
                <button className="gallery-btn" onClick={() => setSelected(selected.size === FOTOS.length ? new Set() : new Set(FOTOS))}>
                  {selected.size === FOTOS.length ? 'Limpar' : 'Selecionar todas'}
                </button>
              )}
              <button className="gallery-btn" onClick={() => { setSelectMode(!selectMode); setSelected(new Set()) }}>
                {selectMode ? 'Cancelar seleção' : 'Selecionar fotos'}
              </button>
              <button className="gallery-btn gallery-btn-primary" disabled={zipping} onClick={() => downloadZip(selectMode && selected.size > 0 ? [...selected] : FOTOS)}>
                {zipping
                  ? `Gerando ZIP… ${progress}%`
                  : selectMode && selected.size > 0
                    ? `Baixar selecionadas (${selected.size})`
                    : 'Baixar todas (ZIP)'}
              </button>
            </div>
          </div>

          <div className="gallery-grid">
            {FOTOS.map((name, i) => (
              <button
                key={name}
                className={`gallery-item${selected.has(name) ? ' selected' : ''}`}
                onClick={() => (selectMode ? toggle(name) : setCurrent(i))}
                aria-label={`Foto ${i + 1}`}
              >
                <img src={`/fotos/thumbs/${name}`} alt={`Foto ${i + 1} do evento`} loading="lazy" decoding="async" />
                {selectMode && <span className="gallery-check">{selected.has(name) ? '✓' : ''}</span>}
              </button>
            ))}
          </div>

          <a className="btn" href="/">Conheça o evento</a>
        </div>
      </section>

      {current !== null && (
        <div className="lightbox" onClick={() => setCurrent(null)}>
          <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <span>{current + 1} / {FOTOS.length}</span>
            <div>
              <a className="gallery-btn gallery-btn-primary" href={`/fotos/full/${FOTOS[current]}`} download={FOTOS[current]}>Baixar foto</a>
              <button className="gallery-btn" onClick={() => setCurrent(null)} aria-label="Fechar">✕</button>
            </div>
          </div>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Anterior">‹</button>
          <img className="lightbox-img" src={`/fotos/full/${FOTOS[current]}`} alt={`Foto ${current + 1} do evento`} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Próxima">›</button>
        </div>
      )}

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

export default Fotos
