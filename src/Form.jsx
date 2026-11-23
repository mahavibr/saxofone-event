import { useState } from 'react'
import './App.css'
import { Header } from './App.jsx'
import { ESCALA, ETAPAS, MAX_TEXTO } from './formSchema.js'

const CHAVE_ENVIADO = 'sax-form-enviado'

function jaEnviou() {
  try { return localStorage.getItem(CHAVE_ENVIADO) === '1' } catch { return false }
}

function Pergunta({ p, valor, onChange }) {
  return (
    <fieldset className="form-pergunta">
      <legend>
        {p.rotulo}
        {p.obrigatoria && <span className="form-obrig" aria-label="obrigatória"> *</span>}
      </legend>

      {p.tipo === 'escala' && (
        <div className="form-escala" role="radiogroup">
          {ESCALA.map((e) => (
            <label key={e.valor} className={`form-escala-item${valor === e.valor ? ' ativo' : ''}`}>
              <input
                type="radio" name={p.id} value={e.valor}
                checked={valor === e.valor} onChange={() => onChange(e.valor)}
              />
              <span className="form-escala-num">{e.valor}</span>
              <span className="form-escala-rot">{e.rotulo}</span>
            </label>
          ))}
        </div>
      )}

      {p.tipo === 'escolha' && (
        <div className="form-opcoes">
          {p.opcoes.map((o) => (
            <label key={o} className={`form-opcao${valor === o ? ' ativo' : ''}`}>
              <input type="radio" name={p.id} value={o} checked={valor === o} onChange={() => onChange(o)} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      )}

      {p.tipo === 'texto' && (
        <>
          <textarea
            rows={4} maxLength={MAX_TEXTO} value={valor || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escreva aqui (opcional)"
          />
          <small className="form-contador">{(valor || '').length}/{MAX_TEXTO}</small>
        </>
      )}
    </fieldset>
  )
}

export default function Form() {
  const [etapa, setEtapa] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [concluido, setConcluido] = useState(jaEnviou)

  const atual = ETAPAS[etapa]
  const ultima = etapa === ETAPAS.length - 1
  const percentual = Math.round((etapa / ETAPAS.length) * 100)

  const definir = (id, v) => setRespostas((r) => ({ ...r, [id]: v }))

  const faltando = () => atual.perguntas.some((p) => p.obrigatoria && (respostas[p.id] === undefined || respostas[p.id] === ''))

  const irPara = (n) => {
    setEtapa(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const avancar = async () => {
    if (faltando()) {
      setErro('Responda todas as perguntas marcadas com * para continuar.')
      return
    }
    setErro('')
    if (!ultima) return irPara(etapa + 1)

    setEnviando(true)
    try {
      const r = await fetch('/api/respostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas }),
      })
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).erro || 'Falha ao enviar.')
      try { localStorage.setItem(CHAVE_ENVIADO, '1') } catch { /* ignora */ }
      setConcluido(true)
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  if (concluido) {
    return (
      <>
        <Header />
        <section className="partituras-page">
          <div className="container form-card form-final">
            <div className="form-final-icone">✓</div>
            <h1>Obrigado!</h1>
            <p className="partituras-subtitle">
              Sua resposta anônima foi registrada. Ela nos ajuda a fazer uma próxima edição ainda melhor. 🎷
            </p>
            <p className="form-final-presente">
              🎁 Como agradecimento, liberamos para você as <strong>fotos do encontro</strong> e as{' '}
              <strong>apresentações dos palestrantes</strong>.
            </p>
            <a className="btn" href="/fotos">Acessar fotos e materiais</a>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Header />
      <section className="partituras-page form-page">
        <div className="container">
          <h1>Pesquisa de Satisfação</h1>
          <p className="partituras-subtitle">Leva cerca de 3 minutos.</p>
          <p className="form-anonimo">
            🔒 <strong>Resposta 100% anônima.</strong> Não pedimos nome, e-mail ou telefone, e não registramos
            seu IP nem seu dispositivo.
          </p>

          <ol className="form-etapas" aria-label="Etapas">
            {ETAPAS.map((e, i) => (
              <li key={e.id} className={i < etapa ? 'feita' : i === etapa ? 'atual' : ''}>
                <span className="form-etapa-bolha">{i < etapa ? '✓' : i + 1}</span>
                <span className="form-etapa-nome">{e.titulo}</span>
              </li>
            ))}
          </ol>

          <div className="form-barra" role="progressbar" aria-valuenow={percentual} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${percentual}%` }} />
          </div>
          <p className="form-progresso-texto">
            {etapa === 0 ? 'Vamos começar!' : `${etapa} de ${ETAPAS.length} etapas concluídas`}
          </p>

          <div className="form-card">
            <h2>{atual.titulo}</h2>
            <p className="form-desc">{atual.descricao}</p>

            {atual.perguntas.map((p) => (
              <Pergunta key={p.id} p={p} valor={respostas[p.id]} onChange={(v) => definir(p.id, v)} />
            ))}

            {erro && <p className="form-erro" role="alert">{erro}</p>}

            <div className="form-acoes">
              {etapa > 0 && (
                <button type="button" className="btn btn-outline" onClick={() => { setErro(''); irPara(etapa - 1) }}>
                  Voltar
                </button>
              )}
              <button type="button" className="btn" onClick={avancar} disabled={enviando}>
                {enviando ? 'Enviando…' : ultima ? 'Enviar resposta' : 'Concluir etapa e continuar'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
