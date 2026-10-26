import { useState } from 'react'
import './App.css'
import giancarloPhoto from './assets/gian.jpg'
import amarildoPhoto from './assets/amarildo.jpeg'
import ciasaxPhoto from './assets/grupociasaxatual.jpeg'
import josePhoto from './assets/jose.jpeg'
import deisePhoto from './assets/fisioterapeutas/Deise.jpeg'
import filipePhoto from './assets/fisioterapeutas/Filipe.jpeg'
import barkleyLogo from './assets/brands/barkley-logo.png'
import barkleyImage from './assets/brands/barkley-boquilhas.jpg'
import intermezzoLogo from './assets/brands/intermezzo-logo.png'
import intermezzoImage from './assets/brands/intermezzo-loja.jpg'
import legereLogo from './assets/brands/legere-logo.png'
import legereImage from './assets/brands/legere-palhetas.jpg'
import pontoMusicalLogo from './assets/brands/ponto-musical-logo.png'
import pontoMusicalImage from './assets/brands/ponto-musical-sax.jpg'
import tokaiLogo from './assets/brands/tokai-logo.png'
import tokaiImage from './assets/brands/tokai-saxofones.jpg'

const TICKET_URL = 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=42e5ad53530a4ae93c15f3a154ceea4d'

const SPONSOR_TIERS = [
  { label: 'Patrocinar o Evento com R$ 15', url: 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=2c6973b9c5386688db9e33da21ed6e22' },
  { label: 'Patrocinar o Evento com R$ 30', url: 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=af70fffde4e5893dc78e1e53f973acf7' },
  { label: 'Patrocinar o Evento com R$ 50', url: 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=f45e7e938dd59340c1f0ddf8d24e2940' }
]

const BRANDS = [
  {
    name: 'Tokai',
    tagline: 'Tradição em instrumentos musicais',
    desc: 'Há mais de quatro décadas no mercado brasileiro, conhecida por órgãos e pianos digitais, oferece uma linha completa de saxofones, madeiras e metais para estudantes e profissionais.',
    logo: tokaiLogo,
    image: tokaiImage,
    imagePosition: 'right center',
    url: 'https://tokai.com.br/'
  },
  {
    name: 'Intermezzo',
    tagline: 'Instrumentos musicais desde 1959',
    desc: 'Uma das maiores lojas de instrumentos musicais do Brasil, com mais de 60 anos de história. Além da loja no Itaim Bibi, reúne escola de música, estúdios e aluguel de instrumentos.',
    logo: intermezzoLogo,
    image: intermezzoImage,
    imagePosition: 'center 70%',
    url: 'https://www.intermezzo.com.br/'
  },
  {
    name: 'Barkley',
    tagline: 'Boquilhas finalizadas à mão',
    desc: 'Fundada em 2003 em São Paulo por Junior Barkley, cria boquilhas para saxofone e clarinete que unem materiais de alta tecnologia ao acabamento artesanal, peça por peça.',
    logo: barkleyLogo,
    image: barkleyImage,
    imagePosition: 'center',
    url: 'https://barkley.com.br/'
  },
  {
    name: 'Légère',
    tagline: 'Palhetas sintéticas de alta performance',
    desc: 'Fabricante canadense pioneira em palhetas sintéticas para saxofone e clarinete, com som e resposta próximos aos da cana natural e durabilidade e consistência muito superiores.',
    logo: legereLogo,
    image: legereImage,
    imagePosition: 'center 60%',
    url: 'https://www.legere.com/'
  },
  {
    name: 'Ponto Musical',
    tagline: 'Especialista em instrumentos de sopro',
    desc: 'Loja paulistana com mais de 10 anos dedicados aos sopros: saxofones, clarinetes, flautas e metais, além de boquilhas, palhetas e acessórios, com envio para todo o Brasil.',
    logo: pontoMusicalLogo,
    image: pontoMusicalImage,
    imagePosition: 'center',
    url: 'https://www.pontomusical.com.br/'
  }
]

function App() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [showSponsorModal, setShowSponsorModal] = useState(false)
  const [selectedPresenter, setSelectedPresenter] = useState(null)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Qual é a data e local do evento?',
      answer: 'A Comemoração de 10 anos do Grupo SAX CCB-ERUDITO-SACRO ocorre na Faculdade Uni Santana, localizada na Rua Voluntários da Pátria, 257 - Próximo ao Metrô Tietê (Linha Azul). O evento acontece no sábado, 21 de novembro de 2026, a partir das 08:00. A programação completa está disponível na seção de cronograma.'
    },
    {
      question: 'Quantos ingressos posso comprar?',
      answer: 'Você pode comprar até 10 ingressos por transação. Para quantidades maiores ou grupos organizados, entre em contato pelo WhatsApp com os organizadores: (15) 99717-4741 (Giancarlo) ou (11) 94174-3352 (José de Carvalho).'
    },
    {
      question: 'Há desconto para grupos?',
      answer: 'Sim! Grupos de 10 ou mais pessoas recebem desconto especial. Entre em contato conosco para negociar as melhores condições.'
    },
    {
      question: 'O evento é acessível para pessoas com deficiência?',
      answer: 'Se necessitar de acomodações especiais, entre em contato com antecedência pelo WhatsApp com os organizadores: (15) 99717-4741 (Giancarlo) ou (11) 94174-3352 (José de Carvalho).'
    },
    {
      question: 'Está incluso almoço?',
      answer: 'Sim! O almoço está incluso no ingresso, assim como o café da manhã.'
    },
    {
      question: 'Como faço para receber o ingresso eletrônico?',
      answer: 'Após a compra, você receberá um e-mail de confirmação com o seu QR code de acesso. Apresente-o na entrada do auditório no dia do evento.'
    }
  ]

  const presentations = [
    {
      name: 'O Saxofone que Venceu o Tempo',
      role: 'Com Giancarlo Medeiros',
      bio: 'Uma reflexão sobre a trajetória do saxofone erudito e sua permanência ao longo das décadas.',
      fullBio: 'Mestre em Música pela Universidade Federal do Rio de Janeiro (UFRJ), pós-graduado em Educação Musical, licenciado em Música e em Pedagogia, e diplomado em saxofone pelo Conservatório de Tatuí. Desenvolve intensa pesquisa sobre o repertório brasileiro para saxofone barítono, resultando até o momento em 13 obras originalmente escritas e dedicadas a ele por compositores como Liduíno Pitombeira, Hudson Nogueira, Edmundo Villani-Côrtes, Fernando de Oliveira e Jackson Lúcio, entre outros. Foi jurado do Concurso para Estudantes de Saxofone Clássico Marcel Mule (México, 2013). Atuou como professor convidado na Oficina Técnica Itinerante para Maestros e Músicos de Banda – Coreto Paulista (2014), no 1º (2017) e 2º ADFEST (2019), em Sorocaba (SP), e no Taller Sinfónico – Saxofone da Universidad del Cauca (Colômbia, 2021). Como integrante do Quarteto SaxBrasil, venceu o Concurso Latino-Americano Rosa Mística (Curitiba, 2009). Participou como artista convidado do I Encontro Internacional de Quartetos de Saxofones, em Montevidéu (Uruguai, 2012); do I Encontro Internacional de Saxofonistas, em La Pampa (Argentina, 2012); do XII Encontro Internacional de Saxofone (México, 2013); do 3º Festival Internacional de Saxofone (Colômbia, 2019); do IV Encontro Internacional de Saxofonistas de Brasília (2024); e do I Encontro de Saxofonistas da Baixada Santista e Litoral (2025). Em 2019, gravou o CD Quarteto de Saxofones SaxBrasil – 10 anos. Atualmente é professor de saxofone no Conservatório de Tatuí e na Escola Municipal de Música de Alumínio (SP), além de integrar o Duo Aracê, o Quarteto SaxBrasil e a Banda Sinfônica do Conservatório de Tatuí.',
      photo: giancarloPhoto,
      photoPosition: 'center top'
    },
    {
      name: 'Como ser uma Referência Sonora',
      role: 'Com Amarildo Nascimento',
      bio: 'Caminhos práticos para desenvolver uma sonoridade autêntica através de exercícios e técnicas de respiração',
      fullBio: `Amarildo Nascimento é trompetista solista da Orquestra Sinfônica da Universidade de São Paulo (OSUSP) e fundador da Orquestra Acadêmica de São Paulo/Uniopera, onde também atua como trompete solo. Desenvolve intensa atividade artística como solista e camerista, sendo membro do São Paulo Brass Trio e artista Conn/Selmer, representando os trompetes Vincent Bach.

Atualmente é doutorando em Música pela Universidade de São Paulo (USP), instituição na qual também obteve o título de Mestre em Música. Possui especializações lato sensu em Educação Musical e em Pedagogia e Performance em Instrumentos de Metais, além de graduação em Música com habilitação em Trompete. É reconhecido como especialista em respiração aplicada à performance musical, com foco no desenvolvimento técnico e expressivo de instrumentistas de sopro, área na qual desenvolve pesquisas e ministra formações.

Entre 2010 e 2019, atuou como professor de Trompete e Música de Câmara no curso de Bacharelado em Música da Faculdade Cantareira (SP), contribuindo significativamente para a formação de novos músicos em nível superior. Sua prática pedagógica está fortemente alicerçada na integração entre aspectos fisiológicos, musicais e interpretativos, com ênfase no uso consciente da respiração como base para o domínio técnico e expressivo do instrumento.

Na área da pesquisa acadêmica, é autor de três artigos científicos e do livro Bachianas Brasileiras de Villa-Lobos: compilação de excertos e estratégias de estudo na esfera da orquestra sinfônica, publicado pela Editora Diálogo Freiriano. Seus estudos combinam abordagens analíticas, pedagógicas e interpretativas voltadas ao repertório orquestral brasileiro e à formação de trompetistas.

Como solista, atuou frente a diversas orquestras de renome, tais como: Orquestra Sinfônica da Universidade de São Paulo (OSUSP), Orquestra Filarmônica de Montevidéu, Orquestra Acadêmica de São Paulo, Orquestra de Câmara da USP (OCAM), Banda Sinfônica Jovem do Estado de São Paulo (BSJESP), entre outras.

Sua atuação em música de câmara inclui recitais com o São Paulo Brass Trio e apresentações em duo com piano. Em 2017, participou da 42ª Conferência Anual da International Trumpet Guild (ITG), nos Estados Unidos, ocasião em que estreou a obra Abril Desconhecido, de Celso Mojola, composta em sua homenagem.

Como músico convidado, atuou junto a importantes orquestras brasileiras, entre as quais se destacam: Orquestra Sinfônica do Estado de São Paulo (OSESP), Orquestra Sinfônica Municipal de São Paulo, Orquestra Sinfônica Brasileira, Orquestra Filarmônica de Goiás, entre outras. No campo da música aplicada, participou como primeiro trompete da produção brasileira do musical A Bela e a Fera (2009) e integrou a equipe de músicos da trilha sonora do filme Salve Geral (2009), dirigido por Sérgio Rezende — obra representante do Brasil no Oscar de Melhor Filme Estrangeiro e vencedora do Festival de Cinema Brasileiro de Miami.

Entre 2001 e 2009, integrou o naipe de trompetes da Orquestra Experimental de Repertório. Atuou também como trompetista da Banda Sinfônica Jovem do Estado de São Paulo entre 1998 e 2001.

Sua formação internacional inclui participação em festivais e seminários como o Camarão Brass and Percussion (Natal, 2018), onde teve aulas com Ole Edvard Antonsen; e o Music Seminars in Tuscany (Itália, 2015), estudando com Reinhold Friedrich e Kristian Steenstrup. Atuou como recitalista e solista convidado no 7º e 8º Encontro Internacional de Trompetistas da Associação Brasileira de Trompetistas (ABT).

Como professor convidado, ministrou masterclasses e oficinas em diversos festivais e instituições no Brasil e no exterior, como o Urubrass (2018 e 2019), Festival MI (Ceará), Festival de Música de Barra Mansa (RJ), e na Universidade da Flórida (EUA), onde apresentou masterclass e recital em 2018.

Ao longo de sua trajetória, participou de masterclasses com trompetistas de renome internacional, dentre os quais se destacam:
• Phillip Smith (New York Philharmonic)
• Fred Mills (Canadian Brass)
• Malte Burba (Alemanha)
• Ole Edvard Antonsen (Noruega)
• Mathias Höfs (German Brass)
• Martin Hurrel (BBC London)
• Rex Richardson (London’s Trinity College of Music)
• Russel DeVuyst (Orchestre Symphonique de Montréal)
• Marc Reese (Empire Brass)
• Paul Merkelo (Orchestre Symphonique de Montréal)
• Pacho Flores (Venezuela - Solista internacional)
• Martin Angerer (Alemanha)
• Friedemann Immer (Alemanha)

Sua atuação se destaca pela integração entre excelência artística, prática pedagógica e investigação acadêmica, com ênfase nas práticas interpretativas para instrumentos de sopro, na pesquisa sobre o repertório sinfônico brasileiro e na aplicação da técnica respiratória como elemento central da performance musical.`,
      photo: amarildoPhoto
    },
    {
      name: 'Fisioterapia para Músicos',
      role: 'Com Deise Barroso e Filipe Tavares',
      bio: 'Saúde, prevenção de lesões e cuidado com o corpo do instrumentista para uma prática musical duradoura.',
      people: [
        {
          name: 'Deise Barroso Minhoto',
          photo: deisePhoto,
          bio: `Deise Barroso Minhoto é Terapeuta Ocupacional, formada pela Faculdade de Medicina da Universidade de São Paulo. Pós-graduada em Terapia da Mão e Membros Superiores, possui mais de 48 anos de experiência na atuação em clínica neuro-ortopédica. Atualmente ocupa o cargo de curadora em projeto social de atendimento a músicos de orquestras.

Durante 15 anos ocupou o cargo de supervisora no Centro de Reabilitação da Santa Casa de Misericórdia de São Paulo. É diretora técnica da Clínica Due – Reabilitação Neuro-ortopédica e membro da Equipe de Cirurgia da Mão do Hospital Albert Einstein (SP), chefiada pelo Dr. José Luiz Pistelli.`
        },
        {
          name: 'Filipe Tavares de Lima',
          photo: filipePhoto,
          bio: `Filipe Tavares de Lima é Fisioterapeuta (CREFITO-3/289134-F). Atua com fisioterapia esportiva desde 2019, com foco em ortopedia, reabilitação e prevenção de lesões. Faz parte da equipe da clínica esportiva Sports Clinic e atua em projeto social com músicos de orquestras desde abril de 2026.

Possui especialização em Reabilitação Funcional das Disfunções Musculoesqueléticas e pós-graduação em Fisioterapia do Esporte e Atividade Física. Entre seus cursos estão Pilates, Dry Needling, Quiropraxia Clínica, Avaliação Multidimensional da Dor, Cinesiologia Funcional e Recovery Esportivo.`
        }
      ]
    },
    {
      name: 'Concerto Especial',
      role: 'CiaSax',
      bio: 'Apresentação musical especial em celebração aos 10 anos do Grupo SAX CCB-ERUDITO-SACRO.',
      fullBio: `O Cia.Sax atua desde o ano de 2017 em diversos festivais e masterclasses, diversificando a música erudita para quarteto de saxofones para todos aqueles que querem ouvir novas sonoridades.

O grupo participou de masterclasses com renomados saxofonistas, de grandes festivais, como Gramado in Concert, 2º Festival de Verão de Campos do Jordão, do Núcleo de Desenvolvimento de Carreira, da EMESP Tom Jobim, e no ano de 2023 foi vencedor do Concurso Jovens Solistas da Banda Sinfônica Jovem do Estado de São Paulo.

Formação:
Soprano: Gabriel Fanzeres
Alto: Arthur Coutinho
Tenor: Matheus Carvalho
Barítono: Bruno Khaleb`,
      photo: ciasaxPhoto,
      photoPosition: 'center 25%'
    },
    {
      name: 'A Arte de Tocar Junto',
      role: 'Com José de Carvalho',
      bio: 'Afinação Coletiva, Equilíbrio sonoro e escuta ativa. Realizando aplicação prática nos hinos com Giancarlo Medeiros.',
      fullBio: `Natural de Matias Olímpio - Piauí, José de Carvalho é doutor em Música pela Universidade Federal do Estado do Rio de Janeiro - UNIRIO na área de Teoria e Prática da Interpretação Musical e mestre pela Universidade de São Paulo - USP, na área de Teoria e Análise Musical, ambas as pesquisas financiadas pela CAPES. Atualmente, desenvolve pesquisa de pós-doutorado na USP sobre o tema, ''Do Índio Feio ao Capadócio'': Interações onomatopaicas entre primitivismo e o moderno na representação do saxofone em Villa-Lobos. Possui experiência no ensino superior e na gestão acadêmica, tendo atuado como professor e coordenador no Centro Universitário Sant'Anna e como editor assistente da Revista Música (ECA/USP). É professor concursado de saxofone no Conservatório de Cubatão e Maestro Assistente da Banda Municipal de Embu das Artes. Como instrumentista, integra a Banda Filarmônica de São Paulo, o Grupo AUM e o Duo Villaniando. Sua trajetória artística inclui premiação em concurso de música de câmara, colaborações com orquestras e bandas sinfônicas, além de apresentações internacionais e publicações nas áreas de Teoria e Prática da Interpretação, Educação Musical e Análise Musical.`,
      photo: josePhoto
    }
  ]

  const schedule = [
    { time: '08:00 às 08:45', event: 'Credenciamento & Café de Boas-Vindas', description: '' },
    { time: '08:45 às 09:00', event: 'Cerimônia de Abertura - Uma Década', description: '' },
    { time: '09:00 às 10:00', event: 'O Saxofone que Venceu o Tempo', description: 'Com Giancarlo Medeiros' },
    { time: '10:00 às 11:00', event: 'Como ser uma Referência Sonora', description: 'Com Amarildo Nascimento' },
    { time: '11:00 às 11:30', event: 'Seu Saxofone trabalha a seu favor?', description: 'Com Caio Henrique' },
    { time: '11:30 às 12:30', event: 'Fisioterapia para Músicos', description: 'Com Deise Barroso e Filipe Tavares' },
    { time: '12:30 às 13:30', event: 'Almoço e Convivência', description: '' },
    { time: '13:30 às 14:20', event: 'Concerto Especial - CiaSax', description: '' },
    { time: '14:20 às 14:40', event: 'Espaço Parceiros Oficiais', description: '' },
    { time: '14:40 às 16:10', event: 'A Arte de Tocar Junto', description: 'Com Giancarlo e José de Carvalho' },
    { time: '16:10 às 16:30', event: 'Sax Experience com os Expositores', description: '' },
    { time: '16:30 às 17:00', event: 'Encerramento e Reconhecimentos', description: '' }
  ]

  const benefits = [
    { icon: '🎷', title: 'Saxofone Erudito', desc: 'Celebração da excelência do saxofone clássico com apresentações de primeiro nível' },
    { icon: '📚', title: 'Aprendizado Contínuo', desc: 'Oportunidade de aprender com saxofonistas talentosos de todo o Brasil' },
    { icon: '🤝', title: 'Networking', desc: 'Conhecer músicos profissionais, professores e apaixonados pelo saxofone' },
    { icon: '🎵', title: 'Repertório Variado', desc: 'Exploração completa do repertório erudito em diferentes variações do saxofone' },
    { icon: '🏛️', title: 'Espaço Privilegiado', desc: 'Auditório com acústica excepcional e ambiente acolhedor para a música' },
    { icon: '💡', title: 'Inspiração Pura', desc: 'Um dia inteiro dedicado à excelência musical e à paixão pelo saxofone' }
  ]

  const audience = [
    {
      title: 'Saxofonistas Profissionais',
      desc: 'Músicos em busca de inspiração, aprendizado e networking com colegas do Brasil inteiro'
    },
    {
      title: 'Estudantes de Música',
      desc: 'Aprendizes que desejam expandir seus conhecimentos e se inspirar com apresentações de qualidade'
    },
    {
      title: 'Professores de Saxofone',
      desc: 'Educadores buscando atualização profissional e conexões com a comunidade musical'
    },
    {
      title: 'Apaixonados por Música Clássica',
      desc: 'Público geral que aprecia a sofisticação e excelência da música erudita'
    }
  ]

  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-content">
          <h1>Comemoração de 10 anos do Grupo: SAX CCB-ERUDITO-SACRO</h1>
          <p className="hero-subtitle">Um dia inteiro celebrando a excelência do saxofone erudito</p>
          <p className="hero-date">Sábado, 21 de novembro de 2026</p>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h2>Sobre o Evento</h2>
          <div className="about-content">
            <p>
              A Comemoração de 10 anos do Grupo SAX CCB-ERUDITO-SACRO é um evento dedicado à celebração e difusão do saxofone
              em sua forma mais clássica e refinada. Reunindo saxofonistas talentosos de todo o Brasil, criamos um espaço
              onde a excelência musical encontra a sofisticação.
            </p>
            <p>
              No sábado, 21 de novembro de 2026, o público poderá desfrutar, durante um dia inteiro, de apresentações de alta qualidade, explorando o repertório
              erudito do saxofone e conhecendo os melhores talentos da cena musical brasileira. É uma oportunidade única de
              imersão na arte do saxofone.
            </p>
            <p>
              Cada apresentação foi cuidadosamente selecionada para oferecer uma experiência musical completa,
              variada e inspiradora. Prepare-se para uma jornada sonora extraordinária!
            </p>
          </div>
        </div>
      </section>

      <section className="alt" id="presentations">
        <div className="container">
          <h2>Apresentações em Destaque</h2>
          <div className="artists-grid">
            {presentations.map((presentation, idx) => (
              <div key={idx} className="artist-card">
                {presentation.people ? (
                  <div className="artist-photo artist-photo-duo">
                    {presentation.people.map((person) => (
                      <img key={person.name} src={person.photo} alt={person.name} />
                    ))}
                  </div>
                ) : (
                  <div className="artist-photo">
                    <img src={presentation.photo} alt={presentation.name} style={{ objectPosition: presentation.photoPosition }} />
                  </div>
                )}
                <h3>{presentation.name}</h3>
                <p className="artist-role">{presentation.role}</p>
                <p>{presentation.bio}</p>
                <button
                  className="btn btn-who"
                  onClick={() => setSelectedPresenter(presentation)}
                >
                  Quem é?
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPresenter && (
        <div className="modal-overlay" onClick={() => setSelectedPresenter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedPresenter(null)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h3>{selectedPresenter.role.replace(/^Com\s+/, '') || selectedPresenter.name}</h3>
            {selectedPresenter.people ? (
              selectedPresenter.people.map((person) => (
                <div key={person.name} className="modal-person">
                  <div className="modal-person-header">
                    <img src={person.photo} alt={person.name} />
                    <h4>{person.name}</h4>
                  </div>
                  <p>{person.bio}</p>
                </div>
              ))
            ) : (
              <p>{selectedPresenter.fullBio}</p>
            )}
          </div>
        </div>
      )}

      <section className="brands-section" id="brands">
        <div className="container">
          <h2>Marcas Presentes no Evento</h2>
          <p className="brands-intro">
            Empresas que acreditam na música e estarão conosco nesta celebração, apresentando instrumentos,
            boquilhas e acessórios para você conhecer de perto.
          </p>
          <div className="brands-grid">
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                className="brand-card"
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="brand-image">
                  <img src={brand.image} alt={`${brand.name} — ${brand.tagline}`} style={{ objectPosition: brand.imagePosition }} loading="lazy" />
                </div>
                <div className="brand-logo">
                  <img src={brand.logo} alt={`Logotipo ${brand.name}`} loading="lazy" />
                </div>
                <div className="brand-body">
                  <h3>{brand.name}</h3>
                  <p className="brand-tagline">{brand.tagline}</p>
                  <p>{brand.desc}</p>
                  <span className="brand-link">Visitar site →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule">
        <div className="container">
          <h2>Cronograma do Evento</h2>
          <p className="section-date">Sábado, 21 de novembro de 2026</p>
          <div className="schedule-container">
            {schedule.map((item, idx) => (
              <div key={idx} className="schedule-item">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-event">{item.event}</div>
                <div className="schedule-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="instrument-section" id="instrument">
        <div className="container">
          <h2>Leve seu Instrumento</h2>
          <div className="instrument-content">
            <div className="instrument-icon">🎷</div>
            <p>
              Será um dia incrível de acesso a profissionais, professores e de muita troca.
            </p>
            <p>
              Ao longo do dia queremos fazer um <strong>"ensaio com hinos"</strong>.
            </p>
            <p className="instrument-highlight">Está liberado levar instrumento. Aproveite!</p>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <h2>Benefícios de Participar</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Para Quem É Este Evento?</h2>
          <div className="audience-grid">
            {audience.map((aud, idx) => (
              <div key={idx} className="audience-card">
                <h3>{aud.title}</h3>
                <p>{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <h2>Como Chegar</h2>
          <div className="location-content">
            <div className="location-info">
              <h3>Faculdade Uni Santana</h3>
              <div className="location-details">
                <p><strong>Data:</strong> Sábado, 21/11/2026, a partir das 08:00</p>
                <p><strong>Endereço:</strong> Rua Voluntários da Pátria, 257<br />Próximo ao Metrô Tietê (Linha Azul)</p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/5515997174741" target="_blank" rel="noopener noreferrer">(15) 99717-4741</a> (Giancarlo)<br /><a href="https://wa.me/5511941743352" target="_blank" rel="noopener noreferrer">(11) 94174-3352</a> (José de Carvalho)</p>
              </div>
              <p>
                A Faculdade Uni Santana está localizada próxima ao Metrô Tietê (Linha Azul),
                com fácil acesso via transporte público.
              </p>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps?q=Rua%20Volunt%C3%A1rios%20da%20P%C3%A1tria%2C%20257%2C%20S%C3%A3o%20Paulo&output=embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id="ticket">
        <div className="container">
          <h2>Ingresso para o Encontro</h2>
          <div className="ticket-container">
            <div className="ticket-info">
              <h3>Acesso Completo ao Encontro</h3>
              <div className="ticket-price">R$ 125,00</div>
              <ul>
                <li>Acesso a todas as apresentações do dia</li>
                <li>Café da Manhã incluso</li>
                <li>Almoço incluso</li>
                <li>Material Didático do dia</li>
                <li>Fotos e Mural do Evento</li>
                <li>Momento de Conexão com Amigos</li>
                <li>Acesso aos Expositores</li>
              </ul>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                Um dia inteiro de música erudita e aprendizado
              </p>
            </div>
            <a className="btn" href={TICKET_URL} target="_blank" rel="noopener noreferrer">
              Garantir seu Lugar
            </a>
            <button
              className="btn btn-support"
              onClick={() => setShowSponsorModal(true)}
            >
              Não irei presencial mas quero apoiar o projeto
            </button>
          </div>
        </div>
      </section>

      {showSponsorModal && (
        <div className="modal-overlay" onClick={() => setShowSponsorModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowSponsorModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h3>Apoie o Projeto</h3>
            <div className="sponsor-options">
              {SPONSOR_TIERS.map((tier) => (
                <a
                  key={tier.url}
                  className="btn"
                  href={tier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tier.label}
                </a>
              ))}
            </div>
            <p className="sponsor-disclaimer">
              O Patrocínio não garante ingresso ou entrada. É uma forma da comunidade apoiar o evento acontecer mesmo à distância.
            </p>
          </div>
        </div>
      )}

      <Footer faqItems={faqItems} expandedFaq={expandedFaq} toggleFaq={toggleFaq} />
    </>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header>
      <div className="header-content">
        <a className="logo" href="/">🎷 Grupo Sax</a>
        <nav className={`nav${isMenuOpen ? ' nav-open' : ''}`}>
          <li><a href="/#about" onClick={closeMenu}>Sobre</a></li>
          <li><a href="/#presentations" onClick={closeMenu}>Apresentações</a></li>
          <li><a href="/#brands" onClick={closeMenu}>Marcas</a></li>
          <li><a href="/#schedule" onClick={closeMenu}>Cronograma</a></li>
          <li><a href="/#ticket" onClick={closeMenu}>Ingresso</a></li>
          <li><a href="/fotos" onClick={closeMenu}>Fotos</a></li>
        </nav>
        <button
          className={`menu-toggle${isMenuOpen ? ' menu-toggle-open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

function Footer({ faqItems, expandedFaq, toggleFaq }) {
  return (
    <footer>
      <div className="footer-content">
        <section className="sponsors-section">
          <h3>Parceiros Oficiais</h3>
          <div className="sponsors-grid">
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                className="sponsor-badge"
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="sponsor-logo">
                  <img src={brand.logo} alt={`Logotipo ${brand.name}`} loading="lazy" />
                </div>
                <p>{brand.name}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <h2>Perguntas Frequentes</h2>
          {faqItems.map((item, idx) => (
            <div key={idx} className="faq-item">
              <div
                className={`faq-question ${expandedFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                {item.question}
              </div>
              <div className={`faq-answer ${expandedFaq === idx ? 'active' : ''}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </section>

        <div className="footer-bottom">
          <p>&copy; 2026 Grupo SAX CCB-ERUDITO-SACRO. Todos os direitos reservados.</p>
          <p>
            WhatsApp:
            <a href="https://wa.me/5515997174741" target="_blank" rel="noopener noreferrer"> (15) 99717-4741</a> (Giancarlo) |
            <a href="https://wa.me/5511941743352" target="_blank" rel="noopener noreferrer"> (11) 94174-3352</a> (José de Carvalho)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
