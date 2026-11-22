import { timingSafeEqual } from 'node:crypto'
import { sql, garantirTabela } from './_db.js'

function senhaValida(recebida) {
  const esperada = process.env.ADMIN_PASSWORD
  if (!esperada || typeof recebida !== 'string') return false
  const a = Buffer.from(recebida)
  const b = Buffer.from(esperada)
  return a.length === b.length && timingSafeEqual(a, b)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ erro: 'Método não permitido.' })
  }
  if (!senhaValida(req.headers['x-admin-password'])) {
    return res.status(401).json({ erro: 'Senha incorreta.' })
  }

  const { acao, id } = req.body || {}
  try {
    await garantirTabela()
    if (acao === 'listar') {
      const linhas = await sql`
        SELECT id, criado_em, respostas, excluido_em
        FROM respostas_satisfacao ORDER BY criado_em DESC`
      return res.status(200).json({ respostas: linhas })
    }
    if ((acao === 'excluir' || acao === 'restaurar') && Number.isInteger(id)) {
      if (acao === 'excluir') {
        await sql`UPDATE respostas_satisfacao SET excluido_em = now() WHERE id = ${id} AND excluido_em IS NULL`
      } else {
        await sql`UPDATE respostas_satisfacao SET excluido_em = NULL WHERE id = ${id}`
      }
      return res.status(200).json({ ok: true })
    }
    return res.status(400).json({ erro: 'Ação inválida.' })
  } catch (e) {
    console.error('Falha no admin', e.message)
    return res.status(500).json({ erro: 'Erro interno.' })
  }
}
