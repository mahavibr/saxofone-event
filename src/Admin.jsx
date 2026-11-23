import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { Header } from './App.jsx'
import { ETAPAS, TODAS_PERGUNTAS } from './formSchema.js'
import { ranking } from './ranking.js'

const CHAVE_SENHA = 'sax-admin-senha'
const media = (ns) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : null)
const fmt = (n, d = 2) => (n === null ? '—' : n.toFixed(d).replace('.', ','))
const data = (iso) => new Date(iso).toLocaleString('pt-BR')

function lerSenha() {
  try { return sessionStorage.getItem(CHAVE_SENHA) || '' } catch { return '' }
}

function calcular(ativas) {
  const escalas = TODAS_PERGUNTAS.filter((p) => p.tipo === 'escala')
  const valores = (id) => ativas.map((r) => r.respostas[id]).filter((v) => typeof v === 'number')

  const porPergunta = escalas.map((p) => {
    const v = valores(p.id)
    return { ...p, media: media(v), n: v.length }
  })
  const todos = porPergunta.flatMap((p) => valores(p.id))
  const porEtapa = ETAPAS.map((e) => {
    const v = e.perguntas.filter((p) => p.tipo === 'escala').flatMap((p) => valores(p.id))
    return { id: e.id, titulo: e.titulo, media: media(v), n: v.length }
  }).filter((e) => e.n > 0)
  const distribuicao = [1, 2, 3, 4, 5].map((n) => ({ nota: n, qtd: todos.filter((v) => v === n).length }))
  const notasGerais = valores('nota_geral')
  const escolhas = TODAS_PERGUNTAS.filter((p) => p.tipo === 'escolha').map((p) => ({
    ...p,
    contagem: p.opcoes.map((o) => ({ opcao: o, qtd: ativas.filter((r) => r.respostas[p.id] === o).length })),
  }))
  const textos = TODAS_PERGUNTAS.filter((p) => p.tipo === 'texto').map((p) => ({
    ...p,
    itens: ativas.filter((r) => r.respostas[p.id]).map((r) => ({ id: r.id, criado_em: r.criado_em, texto: r.respostas[p.id] })),
  }))

  return {
    total: ativas.length,
    notaGeral: media(notasGerais),
    pontuacaoMedia: media(todos),
    satisfacao: todos.length ? (todos.filter((v) => v >= 4).length / todos.length) * 100 : null,
    satisfacaoGeral: notasGerais.length ? (notasGerais.filter((v) => v >= 4).length / notasGerais.length) * 100 : null,
    porPergunta, porEtapa, distribuicao, escolhas, textos,
  }
}

function Barra({ valor, max, cor }) {
  return (
    <div className="adm-barra"><div style={{ width: `${max ? (valor / max) * 100 : 0}%`, background: cor }} /></div>
  )
}

function ListaRanking({ titulo, itens, total, filtro, onFiltro }) {
  if (!itens.length) return null
  return (
    <div className="adm-ranking-col">
      <h4>{titulo}</h4>
      <ol>
        {itens.map((t) => (
          <li key={t.termo}>
            <button className={`adm-termo${filtro === t.termo ? ' ativo' : ''}`} onClick={() => onFiltro(filtro === t.termo ? null : t)}>
              <span className="adm-termo-nome">{t.termo}</span>
              <Barra valor={t.qtd} max={total} cor="var(--accent-gold)" />
              <b>{t.qtd}</b>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

function RespostasEscritas({ textos, onExcluir }) {
  const [aba, setAba] = useState(0)
  const [pos, setPos] = useState(0)
  const [filtro, setFiltro] = useState(null)
  const p = textos[aba]
  const r = useMemo(() => ranking(p.itens, { max: 6 }), [p.itens])
  const visiveis = filtro ? p.itens.filter((t) => filtro.ids.has(t.id)) : p.itens
  const atual = Math.min(pos, Math.max(visiveis.length - 1, 0))
  const t = visiveis[atual]
  const temRanking = r.palavras.length > 0 || r.expressoes.length > 0

  const ir = (n) => setPos(Math.min(Math.max(n, 0), visiveis.length - 1))
  const trocarAba = (i) => { setAba(i); setPos(0); setFiltro(null) }
  const aoTeclar = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(atual + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(atual - 1) }
  }

  return (
    <div className="adm-resp">
      <div className="adm-abas" role="tablist">
        {textos.map((q, i) => (
          <button key={q.id} role="tab" aria-selected={i === aba} className={`adm-aba${i === aba ? ' ativa' : ''}`} onClick={() => trocarAba(i)}>
            <span>{q.rotulo}</span><b>{q.itens.length}</b>
          </button>
        ))}
      </div>

      {p.itens.length === 0 ? (
        <p className="form-desc adm-vazio">Ainda não há respostas para esta pergunta.</p>
      ) : (
        <div className="adm-visor" tabIndex={0} onKeyDown={aoTeclar}>
          {filtro && (
            <p className="adm-filtro">
              Filtrando por “{filtro.termo}” · {visiveis.length} de {p.itens.length} respostas ·{' '}
              <button className="adm-link" onClick={() => { setFiltro(null); setPos(0) }}>limpar filtro</button>
            </p>
          )}
          <div className="adm-visor-nav">
            <button className="gallery-btn" onClick={() => ir(atual - 1)} disabled={atual === 0} aria-label="Resposta anterior">‹ Anterior</button>
            <span className="adm-visor-pos">Resposta <b>{atual + 1}</b> de {visiveis.length}</span>
            <button className="gallery-btn gallery-btn-primary" onClick={() => ir(atual + 1)} disabled={atual >= visiveis.length - 1} aria-label="Próxima resposta">Próxima ›</button>
          </div>
          {t && (
            <div className="adm-cartao">
              <p className="adm-cartao-texto">{t.texto}</p>
              <div className="adm-cartao-meta">
                <span>#{t.id} · {data(t.criado_em)}</span>
                <button className="adm-link adm-perigo" onClick={() => onExcluir(t.id)}>excluir resposta</button>
              </div>
            </div>
          )}
          <div className="adm-pontos" aria-hidden="true">
            {visiveis.length <= 40 && visiveis.map((x, i) => (
              <button key={x.id} className={i === atual ? 'ativo' : ''} onClick={() => ir(i)} tabIndex={-1} />
            ))}
          </div>
        </div>
      )}
      {temRanking && (
        <details className="adm-ranking">
          <summary>Termos mais citados <small>· clique em um termo para ver só as respostas com ele</small></summary>
          <div className="adm-ranking-cols">
            <ListaRanking titulo="Expressões" itens={r.expressoes} total={p.itens.length} filtro={filtro?.termo} onFiltro={(x) => { setFiltro(x); setPos(0) }} />
            <ListaRanking titulo="Palavras" itens={r.palavras} total={p.itens.length} filtro={filtro?.termo} onFiltro={(x) => { setFiltro(x); setPos(0) }} />
          </div>
        </details>
      )}
    </div>
  )
}

export default function Admin() {
  const [senha, setSenha] = useState(lerSenha)
  const [entrada, setEntrada] = useState('')
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [verExcluidas, setVerExcluidas] = useState(false)

  const chamar = useCallback(async (pwd, corpo) => {
    const r = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pwd },
      body: JSON.stringify(corpo),
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) throw Object.assign(new Error(j.erro || 'Erro.'), { status: r.status })
    return j
  }, [])

  const carregar = useCallback(async (pwd) => {
    setCarregando(true)
    setErro('')
    try {
      const j = await chamar(pwd, { acao: 'listar' })
      setDados(j.respostas)
      setSenha(pwd)
      try { sessionStorage.setItem(CHAVE_SENHA, pwd) } catch { /* ignora */ }
    } catch (e) {
      if (e.status === 401) {
        setSenha('')
        try { sessionStorage.removeItem(CHAVE_SENHA) } catch { /* ignora */ }
      }
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }, [chamar])

  const [iniciou, setIniciou] = useState(false)
  if (!iniciou && senha) {
    setIniciou(true)
    carregar(senha)
  }

  const mudar = async (acao, id) => {
    if (acao === 'excluir' && !window.confirm('Excluir esta resposta? Ela poderá ser restaurada depois (exclusão lógica).')) return
    try {
      await chamar(senha, { acao, id })
      await carregar(senha)
    } catch (e) { setErro(e.message) }
  }

  const ativas = useMemo(() => (dados || []).filter((r) => !r.excluido_em), [dados])
  const excluidas = useMemo(() => (dados || []).filter((r) => r.excluido_em), [dados])
  const m = useMemo(() => calcular(ativas), [ativas])

  if (!dados) {
    return (
      <>
        <Header />
        <section className="partituras-page">
          <div className="container form-card adm-login">
            <h1>Admin</h1>
            <p className="partituras-subtitle">Pesquisa de satisfação</p>
            <form onSubmit={(e) => { e.preventDefault(); carregar(entrada) }}>
              <input
                type="password" value={entrada} onChange={(e) => setEntrada(e.target.value)}
                placeholder="Senha" autoComplete="current-password" autoFocus
              />
              {erro && <p className="form-erro" role="alert">{erro}</p>}
              <button className="btn" type="submit" disabled={carregando || !entrada}>
                {carregando ? 'Entrando…' : 'Entrar'}
              </button>
            </form>
          </div>
        </section>
      </>
    )
  }

  const maxDist = Math.max(...m.distribuicao.map((d) => d.qtd), 1)

  return (
    <>
      <Header />
      <section className="partituras-page adm-page">
        <div className="container">
          <h1>Indicadores de Satisfação</h1>
          <p className="partituras-subtitle">Notas de 1 (muito insatisfeito) a 5 (muito satisfeito) · respostas excluídas não entram nos cálculos</p>
          {erro && <p className="form-erro" role="alert">{erro}</p>}

          <div className="adm-kpis">
            <div className="adm-kpi"><strong>{m.total}</strong><span>Respostas</span></div>
            <div className="adm-kpi"><strong>{fmt(m.notaGeral)}</strong><span>Nota geral média</span></div>
            <div className="adm-kpi"><strong>{fmt(m.pontuacaoMedia)}</strong><span>Pontuação média (todas as notas)</span></div>
            <div className="adm-kpi"><strong>{fmt(m.satisfacao, 0)}{m.satisfacao !== null && '%'}</strong><span>Índice de satisfação (notas 4–5)</span></div>
            <div className="adm-kpi"><strong>{fmt(m.satisfacaoGeral, 0)}{m.satisfacaoGeral !== null && '%'}</strong><span>Satisfeitos na nota geral</span></div>
          </div>

          <div className="adm-grid">
            <div className="form-card">
              <h2>Média por etapa</h2>
              {m.porEtapa.map((e) => (
                <div key={e.id} className="adm-linha">
                  <span>{e.titulo}</span><Barra valor={e.media} max={5} cor="var(--accent-gold)" /><b>{fmt(e.media)}</b>
                </div>
              ))}
              <h2 style={{ marginTop: '1.5rem' }}>Distribuição das notas</h2>
              {m.distribuicao.map((d) => (
                <div key={d.nota} className="adm-linha">
                  <span>Nota {d.nota}</span><Barra valor={d.qtd} max={maxDist} cor="var(--accent-bronze)" /><b>{d.qtd}</b>
                </div>
              ))}
            </div>

            <div className="form-card">
              <h2>Média por pergunta</h2>
              {m.porPergunta.map((p) => (
                <div key={p.id} className="adm-linha">
                  <span>{p.rotulo}</span><Barra valor={p.media} max={5} cor="var(--accent)" /><b>{fmt(p.media)}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="form-card">
            <h2>Respostas de escolha</h2>
            <div className="adm-grid">
              {m.escolhas.map((p) => {
                const max = Math.max(...p.contagem.map((c) => c.qtd), 1)
                return (
                  <div key={p.id}>
                    <h3>{p.rotulo}</h3>
                    {p.contagem.map((c) => (
                      <div key={c.opcao} className="adm-linha">
                        <span>{c.opcao}</span><Barra valor={c.qtd} max={max} cor="var(--accent-bronze)" /><b>{c.qtd}</b>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="form-card">
            <h2>Respostas escritas</h2>
            <RespostasEscritas textos={m.textos} onExcluir={(id) => mudar('excluir', id)} />
          </div>

          <div className="form-card">
            <h2>Todas as respostas</h2>
            <div className="adm-tabela-wrap">
              <table className="adm-tabela">
                <thead>
                  <tr>
                    <th>#</th><th>Data</th><th>Nota geral</th><th>Média</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {(verExcluidas ? dados : ativas).map((r) => {
                    const notas = TODAS_PERGUNTAS.filter((p) => p.tipo === 'escala').map((p) => r.respostas[p.id]).filter((v) => typeof v === 'number')
                    return (
                      <tr key={r.id} className={r.excluido_em ? 'adm-excluida' : ''}>
                        <td>{r.id}</td><td>{data(r.criado_em)}</td><td>{r.respostas.nota_geral ?? '—'}</td><td>{fmt(media(notas))}</td>
                        <td>
                          {r.excluido_em
                            ? <button className="adm-link" onClick={() => mudar('restaurar', r.id)}>restaurar</button>
                            : <button className="adm-link adm-perigo" onClick={() => mudar('excluir', r.id)}>excluir</button>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <label className="adm-check">
              <input type="checkbox" checked={verExcluidas} onChange={(e) => setVerExcluidas(e.target.checked)} />
              Mostrar respostas excluídas ({excluidas.length})
            </label>
          </div>

          <div className="form-acoes">
            <button className="btn btn-outline" onClick={() => carregar(senha)} disabled={carregando}>Atualizar</button>
            <button className="btn btn-outline" onClick={() => { try { sessionStorage.removeItem(CHAVE_SENHA) } catch { /* ignora */ } setDados(null); setSenha(''); setIniciou(false) }}>Sair</button>
          </div>
        </div>
      </section>
    </>
  )
}
