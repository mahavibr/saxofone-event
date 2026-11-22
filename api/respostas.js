import { sql, garantirTabela } from './_db.js'
import { validarRespostas } from '../src/formSchema.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ erro: 'Método não permitido.' })
  }
  const resultado = validarRespostas(req.body?.respostas)
  if (!resultado.ok) return res.status(400).json({ erro: resultado.erro })

  try {
    await garantirTabela()
    await sql`INSERT INTO respostas_satisfacao (respostas) VALUES (${JSON.stringify(resultado.respostas)}::jsonb)`
    return res.status(201).json({ ok: true })
  } catch (e) {
    console.error('Falha ao salvar resposta', e.message)
    return res.status(500).json({ erro: 'Não foi possível salvar. Tente novamente.' })
  }
}
