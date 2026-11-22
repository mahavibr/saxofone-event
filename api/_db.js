import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
export const sql = url ? neon(url) : null

let pronto
export function garantirTabela() {
  if (!sql) throw new Error('DATABASE_URL não configurada')
  // Anonimato: nenhuma coluna de IP, user-agent ou identificação.
  pronto ??= sql`
    CREATE TABLE IF NOT EXISTS respostas_satisfacao (
      id SERIAL PRIMARY KEY,
      criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
      respostas JSONB NOT NULL,
      excluido_em TIMESTAMPTZ
    )
  `
  return pronto
}
