// Definição única do formulário: usada pela página /form, pela API e pelo /admin.
export const ESCALA = [
  { valor: 1, rotulo: 'Muito insatisfeito' },
  { valor: 2, rotulo: 'Insatisfeito' },
  { valor: 3, rotulo: 'Neutro' },
  { valor: 4, rotulo: 'Satisfeito' },
  { valor: 5, rotulo: 'Muito satisfeito' },
]

export const ETAPAS = [
  {
    id: 'geral',
    titulo: 'Visão geral',
    descricao: 'Como foi sua experiência no evento como um todo?',
    perguntas: [
      { id: 'nota_geral', tipo: 'escala', rotulo: 'Qual o seu nível de satisfação geral com o evento?', obrigatoria: true },
      {
        id: 'expectativa', tipo: 'escolha', obrigatoria: true,
        rotulo: 'O evento atendeu às suas expectativas?',
        opcoes: ['Superou', 'Atendeu', 'Atendeu parcialmente', 'Não atendeu'],
      },
      {
        id: 'voltaria', tipo: 'escolha', obrigatoria: true,
        rotulo: 'Você participaria de uma próxima edição?',
        opcoes: ['Com certeza', 'Provavelmente', 'Talvez', 'Não'],
      },
    ],
  },
  {
    id: 'programacao',
    titulo: 'Programação',
    descricao: 'Avalie cada atividade da grade.',
    perguntas: [
      { id: 'prog_ciasax', tipo: 'escala', rotulo: 'Concerto Especial - CiaSax', obrigatoria: true },
      { id: 'prog_saxofone_tempo', tipo: 'escala', rotulo: 'O Saxofone que Venceu o Tempo', obrigatoria: true },
      { id: 'prog_referencia_sonora', tipo: 'escala', rotulo: 'Como ser uma Referência Sonora', obrigatoria: true },
      { id: 'prog_saxofone_favor', tipo: 'escala', rotulo: 'Seu Saxofone trabalha a seu favor?', obrigatoria: true },
      { id: 'prog_fisioterapia', tipo: 'escala', rotulo: 'Fisioterapia para Músicos', obrigatoria: true },
      { id: 'prog_expositores', tipo: 'escala', rotulo: 'Conhecer Expositores', obrigatoria: true },
      { id: 'prog_tocar_junto', tipo: 'escala', rotulo: 'A Arte de Tocar Junto', obrigatoria: true },
    ],
  },
  {
    id: 'estrutura',
    titulo: 'Estrutura e organização',
    descricao: 'Local, acolhimento e organização.',
    perguntas: [
      { id: 'est_local', tipo: 'escala', rotulo: 'Local e acústica do auditório', obrigatoria: true },
      { id: 'est_credenciamento', tipo: 'escala', rotulo: 'Credenciamento e café de boas-vindas', obrigatoria: true },
      { id: 'est_almoco', tipo: 'escala', rotulo: 'Almoço e convivência', obrigatoria: true },
      { id: 'est_organizacao', tipo: 'escala', rotulo: 'Organização e cumprimento dos horários', obrigatoria: true },
      {
        id: 'est_duracao', tipo: 'escolha', obrigatoria: true,
        rotulo: 'Na sua opinião, a duração do evento foi:',
        opcoes: ['Curta demais', 'Adequada', 'Longa demais'],
      },
    ],
  },
  {
    id: 'perfil',
    titulo: 'Sobre você (anônimo)',
    descricao: 'Perguntas genéricas, sem identificar você.',
    perguntas: [
      {
        id: 'perfil_nivel', tipo: 'escolha', obrigatoria: true,
        rotulo: 'Como você se define como saxofonista?',
        opcoes: ['Estudante', 'Amador', 'Profissional', 'Professor(a)', 'Apreciador(a) / não toco'],
      },
      {
        id: 'perfil_conheceu', tipo: 'escolha', obrigatoria: true,
        rotulo: 'Como você conheceu o evento?',
        opcoes: ['Redes sociais', 'Indicação de amigos', 'Grupo de WhatsApp', 'Igreja / escola de música', 'Outro'],
      },
    ],
  },
  {
    id: 'comentarios',
    titulo: 'Comentários',
    descricao: 'Fique à vontade — tudo é opcional. Não informe nome ou contato.',
    perguntas: [
      { id: 'txt_gostou', tipo: 'texto', rotulo: 'O que você mais gostou?', obrigatoria: false },
      { id: 'txt_faltou_100', tipo: 'texto', rotulo: 'O que faltou para ser 100%?', obrigatoria: false },
      { id: 'txt_melhorar', tipo: 'texto', rotulo: 'O que poderíamos melhorar?', obrigatoria: false },
      { id: 'txt_datas', tipo: 'texto', rotulo: 'Quais datas você aconselharia para o próximo evento?', obrigatoria: false },
      { id: 'txt_sugestoes', tipo: 'texto', rotulo: 'Sugestões de temas, convidados ou atividades para a próxima edição', obrigatoria: false },
    ],
  },
]

export const TODAS_PERGUNTAS = ETAPAS.flatMap((e) => e.perguntas)
export const MAX_TEXTO = 1000

// Valida e normaliza as respostas. Retorna { ok, respostas } ou { ok:false, erro }.
export function validarRespostas(entrada) {
  if (!entrada || typeof entrada !== 'object' || Array.isArray(entrada)) {
    return { ok: false, erro: 'Respostas inválidas.' }
  }
  const respostas = {}
  for (const p of TODAS_PERGUNTAS) {
    const v = entrada[p.id]
    const vazio = v === undefined || v === null || v === ''
    if (vazio) {
      if (p.obrigatoria) return { ok: false, erro: `Pergunta obrigatória sem resposta: ${p.rotulo}` }
      continue
    }
    if (p.tipo === 'escala') {
      if (!Number.isInteger(v) || v < 1 || v > 5) return { ok: false, erro: `Valor inválido: ${p.rotulo}` }
      respostas[p.id] = v
    } else if (p.tipo === 'escolha') {
      if (typeof v !== 'string' || !p.opcoes.includes(v)) return { ok: false, erro: `Opção inválida: ${p.rotulo}` }
      respostas[p.id] = v
    } else {
      if (typeof v !== 'string') return { ok: false, erro: `Texto inválido: ${p.rotulo}` }
      const t = v.trim().slice(0, MAX_TEXTO)
      if (t) respostas[p.id] = t
    }
  }
  return { ok: true, respostas }
}
