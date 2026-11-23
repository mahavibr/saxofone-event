// Copia src/assets/materiais/<Autor>/<arquivo> para public/materiais/ e gera
// src/materiais-manifest.json agrupado por pasta (autor). Rode: npm run materiais
// Arquivos com o mesmo nome base (ex.: .pdf e .pptx) viram um item com vários formatos.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const SRC = path.join(ROOT, 'src/assets/materiais')
const OUT = path.join(ROOT, 'public/materiais')

// Nome exibido para cada pasta (quando o nome da pasta não tem acento etc.)
const NOMES = { 'Jose de Carvalho': 'José de Carvalho' }

// Título exibido para arquivos com nome pouco legível (chave = nome base já limpo)
const TITULOS = { 'RESPIRAÇÃO PALESTRA EM PP': 'Respiração – Palestra' }

const visivel = (n) => !n.startsWith('.')
// Nome seguro para URL (sem acento/espaço): evita divergência NFC/NFD entre macOS e o deploy
const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9.]+/g, '-').replace(/-+\./g, '.').replace(/^-+|-+$/g, '')
const titulo = (base) => {
  const t = base.replace(/\.pptx$/i, '').replace(/\s+/g, ' ').trim()
  return TITULOS[t] || t.charAt(0).toUpperCase() + t.slice(1)
}

fs.rmSync(OUT, { recursive: true, force: true })
const manifest = []
for (const pasta of fs.readdirSync(SRC).filter(visivel).sort()) {
  const dir = path.join(SRC, pasta)
  if (!fs.statSync(dir).isDirectory()) continue
  fs.mkdirSync(path.join(OUT, slug(pasta)), { recursive: true })
  const itens = new Map()
  for (const arq of fs.readdirSync(dir).filter(visivel).sort((a, b) => a.localeCompare(b, 'pt-BR'))) {
    const origem = path.join(dir, arq)
    if (!fs.statSync(origem).isFile()) continue
    const ext = path.extname(arq).slice(1).toLowerCase()
    const base = path.basename(arq, path.extname(arq)).normalize('NFC')
    const t = titulo(base)
    const destino = `${slug(base.replace(/\.pptx$/i, ''))}.${ext}`
    fs.copyFileSync(origem, path.join(OUT, slug(pasta), destino))
    if (!itens.has(t)) itens.set(t, { titulo: t, arquivos: [] })
    itens.get(t).arquivos.push({ formato: ext, url: `/materiais/${slug(pasta)}/${destino}`, nome: `${t}.${ext}`, bytes: fs.statSync(origem).size })
  }
  for (const it of itens.values()) it.arquivos.sort((a, b) => (a.formato === 'pdf' ? -1 : b.formato === 'pdf' ? 1 : 0))
  manifest.push({ autor: NOMES[pasta] || pasta, itens: [...itens.values()] })
}
fs.writeFileSync(path.join(ROOT, 'src/materiais-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`${manifest.reduce((s, g) => s + g.itens.length, 0)} materiais em ${manifest.length} pastas`)
