// Ranking de termos das respostas escritas do formulário.
// Conta em QUANTAS RESPOSTAS cada termo aparece (não quantas vezes no total),
// para que uma resposta longa que repete uma palavra não distorça o resultado.

const STOP = new Set(`
a à ao aos as às o os e é em no na nos nas num numa de da do das dos dum duma
um uma uns umas para pra pro pelo pela pelos pelas por com sem sob sobre entre até
que se não nao sim mais menos muito muita muitos muitas pouco pouca bem mal já ja
eu tu ele ela nós nos vós eles elas você voce vocês voces me te lhe nos vos lhes
meu minha meus minhas seu sua seus suas nosso nossa nossos nossas dele dela deles delas
este esta estes estas esse essa esses essas isto isso aquilo aquele aquela aqueles aquelas
ser estar ter haver foi era são sao está esta estão estao tem têm tinha teve fosse seria
houve há ha vai vou ia iria fazer faz fez pode poderia podia deve deveria seja sejam
como quando onde qual quais quem porque pois porém porem mas ou também tambem então entao
só so todo toda todos todas tudo nada algo algum alguma alguns algumas outro outra outros outras
mesmo mesma cada tão tao tanto tanta assim ainda aqui ali lá la acho achei gostei gostaria
coisa coisas vez vezes ate etc ok estava estavam ficou fica ficar precisa precisava faltou falta melhor
`.split(/\s+/).filter(Boolean))

const semAcento = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
// Chave de agrupamento: sem acento e com plural simples unificado (ex.: "palestras" = "palestra")
const chave = (w) => {
  const k = semAcento(w)
  return k.length > 4 && k.endsWith('s') && !k.endsWith('ss') ? k.slice(0, -1) : k
}
const ehStop = (w) => STOP.has(w) || STOP.has(semAcento(w))
// Podem iniciar uma expressão ("mais tempo", "pouco espaço"), mas não contam sozinhas
const INICIO_EXPR = new Set(['mais', 'menos', 'muito', 'muita', 'pouco', 'pouca', 'falta', 'faltou', 'melhor'])
const tokens = (texto) => (texto.toLowerCase().match(/[\p{L}\p{N}/]+/gu) || [])
  .filter((t) => t.length >= 3 || /\d/.test(t))

// Retorna { palavras, expressoes }, cada item { termo, qtd, ids }
export function ranking(itens, { max = 10 } = {}) {
  const contar = (mapa, k, forma, id) => {
    const e = mapa.get(k) || { formas: new Map(), ids: new Set() }
    e.formas.set(forma, (e.formas.get(forma) || 0) + 1)
    e.ids.add(id)
    mapa.set(k, e)
  }
  const palavras = new Map()
  const expressoes = new Map()

  for (const { id, texto } of itens) {
    const ts = tokens(String(texto))
    for (const t of ts) if (!ehStop(t)) contar(palavras, chave(t), t, id)
    // Expressões de 2 e 3 palavras: não começam nem terminam com palavra vazia
    for (const n of [2, 3]) {
      for (let i = 0; i + n <= ts.length; i++) {
        const g = ts.slice(i, i + n)
        if ((ehStop(g[0]) && !INICIO_EXPR.has(semAcento(g[0]))) || ehStop(g[n - 1])) continue
        contar(expressoes, g.map(chave).join(' '), g.join(' '), id)
      }
    }
  }

  const minimo = itens.length >= 5 ? 2 : 1
  const lista = (mapa) => [...mapa.values()]
    .map((e) => ({
      termo: [...e.formas.entries()].sort((a, b) => b[1] - a[1])[0][0],
      qtd: e.ids.size,
      ids: e.ids,
    }))
    .filter((e) => e.qtd >= minimo)
    .sort((a, b) => b.qtd - a.qtd || a.termo.localeCompare(b.termo, 'pt-BR'))

  // Remove expressões de 2 palavras contidas numa de 3 com a mesma contagem
  const exps = lista(expressoes).filter((e) => e.qtd >= 2)
  const filtradas = exps.filter((e) => !exps.some((o) =>
    o !== e && o.qtd === e.qtd && o.termo.split(' ').length > e.termo.split(' ').length && o.termo.includes(e.termo)))

  return { palavras: lista(palavras).slice(0, max), expressoes: filtradas.slice(0, max) }
}
