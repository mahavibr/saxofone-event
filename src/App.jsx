import { useState } from 'react'
import './App.css'

function App() {
  const [showThankYou, setShowThankYou] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleTicketClick = () => {
    setShowThankYou(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const faqItems = [
    {
      question: 'Qual é a data e local do evento?',
      answer: 'O 1º Encontro de Saxofone Erudito de São Paulo ocorre no Auditório Ignaz J. Sessler, localizado na Rua Bresser, 2315 (Bloco A) - Mooca - São Paulo - SP. A data e horário completos estão disponíveis na seção de cronograma.'
    },
    {
      question: 'Quantos ingressos posso comprar?',
      answer: 'Você pode comprar até 10 ingressos por transação. Para quantidades maiores ou grupos organizados, entre em contato pelo email encontrosaxofone@gmail.com.'
    },
    {
      question: 'Há desconto para grupos?',
      answer: 'Sim! Grupos de 10 ou mais pessoas recebem desconto especial. Entre em contato conosco para negociar as melhores condições.'
    },
    {
      question: 'O evento é acessível para pessoas com deficiência?',
      answer: 'Sim, o auditório possui acessibilidade completa. Se necessitar de acomodações especiais, entre em contato pelo email encontrosaxofone@gmail.com com antecedência.'
    },
    {
      question: 'Está incluso almoço?',
      answer: 'Sim! O ingresso inclui almoço durante o intervalo do meio do dia. Também haverá coffee break nos períodos de descanso.'
    },
    {
      question: 'Como faço para receber o ingresso eletrônico?',
      answer: 'Após a compra, você receberá um e-mail de confirmação com o seu QR code de acesso. Apresente-o na entrada do auditório no dia do evento.'
    }
  ]

  const presentations = [
    {
      name: 'Apresentação 1',
      role: 'Saxofone Soprano',
      bio: 'Exploração do repertório clássico para saxofone soprano, desde os grandes compositores eruditos até obras contemporâneas.'
    },
    {
      name: 'Apresentação 2',
      role: 'Saxofone Alto',
      bio: 'Uma jornada através da música erudita para saxofone alto, destacando a versatilidade e beleza tímbrica do instrumento.'
    },
    {
      name: 'Apresentação 3',
      role: 'Saxofone Tenor',
      bio: 'Apresentação focada no saxofone tenor erudito, explorando suas capacidades expressivas no contexto da música clássica.'
    }
  ]

  const schedule = [
    { time: '09:00', event: 'Abertura do Evento', description: 'Boas-vindas, apresentação do programa e abertura do auditório' },
    { time: '09:30', event: 'Apresentação 1 - Saxofone Soprano', description: 'Repertório clássico para saxofone soprano' },
    { time: '10:30', event: 'Intervalo', description: 'Coffee break e networking entre os participantes' },
    { time: '11:00', event: 'Apresentação 2 - Saxofone Alto', description: 'Música erudita para saxofone alto' },
    { time: '12:00', event: 'Almoço', description: 'Intervalo para almoço dos participantes' },
    { time: '13:30', event: 'Apresentação 3 - Saxofone Tenor', description: 'Repertório erudito para saxofone tenor' },
    { time: '14:30', event: 'Pausa', description: 'Breve intervalo' },
    { time: '15:00', event: 'Apresentações Finais', description: 'Seleção especial das melhores apresentações do dia' },
    { time: '16:30', event: 'Encerramento', description: 'Agradecimentos, prêmios e brinde final do encontro' }
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

  if (showThankYou) {
    return (
      <>
        <Header />
        <div className="thank-you-container">
          <div className="thank-you-icon">🎉</div>
          <div className="thank-you-content">
            <h1>Obrigado pela sua compra!</h1>
            <p>Seu ingresso foi confirmado e um e-mail de confirmação foi enviado para seu endereço de e-mail.</p>

            <div className="confirmation-details">
              <p><strong>Confirmação #:</strong> SAX-2024-001234</p>
              <p><strong>Evento:</strong> 1º Encontro de Saxofone Erudito de São Paulo</p>
              <p><strong>Data:</strong> [Data do evento]</p>
              <p><strong>Horário:</strong> 09:00 às 16:30</p>
              <p><strong>Local:</strong> Auditório Ignaz J. Sessler, Rua Bresser, 2315</p>
              <p><strong>Ingresso(s):</strong> 1 acesso completo</p>
            </div>

            <p>Você receberá seu QR code de acesso por e-mail. Apresente-o na entrada do teatro.</p>

            <button
              className="btn"
              onClick={() => setShowThankYou(false)}
              style={{ marginTop: '2rem' }}
            >
              Voltar à página principal
            </button>
          </div>
        </div>
        <Footer faqItems={faqItems} expandedFaq={expandedFaq} toggleFaq={toggleFaq} />
      </>
    )
  }

  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-content">
          <h1>1º Encontro de Saxofone Erudito de São Paulo</h1>
          <p className="hero-subtitle">Um dia inteiro celebrando a excelência do saxofone erudito</p>
        </div>
      </section>

      <section className="hero-video-section">
        <div className="container">
          <div className="hero-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allowFullScreen
              title="Saxofone - Vídeo Explicativo"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h2>Sobre o Evento</h2>
          <div className="about-content">
            <p>
              O 1º Encontro de Saxofone Erudito de São Paulo é um evento dedicado à celebração e difusão do saxofone
              em sua forma mais clássica e refinada. Reunindo saxofonistas talentosos de todo o Brasil, criamos um espaço
              onde a excelência musical encontra a sofisticação.
            </p>
            <p>
              Durante um dia inteiro, o público poderá desfrutar de apresentações de alta qualidade, explorando o repertório
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
                <div className="artist-photo">
                  <div className="artist-photo-placeholder">{idx + 1}</div>
                </div>
                <h3>{presentation.name}</h3>
                <p className="artist-role">{presentation.role}</p>
                <p>{presentation.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule">
        <div className="container">
          <h2>Cronograma do Evento</h2>
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
              <h3>Auditório Ignaz J. Sessler</h3>
              <div className="location-details">
                <p><strong>Endereço:</strong> Rua Bresser, 2315 - Bloco A<br />Mooca - São Paulo, SP 03162-030</p>
                <p><strong>Telefone:</strong> (11) 2000-0000</p>
                <p><strong>Estacionamento:</strong> Disponível no local</p>
                <p><strong>Acessibilidade:</strong> Completa para PCD</p>
              </div>
              <p>
                O Auditório Ignaz J. Sessler está localizado na região da Mooca,
                com fácil acesso via transporte público e estacionamento disponível no local.
              </p>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.7412345678!2d-46.56789!3d-23.54321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce56a1234567b5%3A0xac9b08c372d56166!2sRua%20Bresser%2C%202315%20-%20Mooca%2C%20S%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1234567890"
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
              <div className="ticket-price">R$ 120,00</div>
              <ul>
                <li>Acesso a todas as apresentações do dia</li>
                <li>Intervalo com coffee break</li>
                <li>Almoço incluído</li>
                <li>Certificado de participação</li>
                <li>Networking com saxofonistas profissionais</li>
              </ul>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                Um dia inteiro de música erudita e aprendizado
              </p>
            </div>
            <button className="btn" onClick={handleTicketClick}>
              Garantir seu Lugar
            </button>
          </div>
        </div>
      </section>

      <Footer faqItems={faqItems} expandedFaq={expandedFaq} toggleFaq={toggleFaq} />
    </>
  )
}

function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="logo">🎷 SAXOFONE</div>
        <nav className="nav">
          <li><a href="#about">Sobre</a></li>
          <li><a href="#presentations">Apresentações</a></li>
          <li><a href="#schedule">Cronograma</a></li>
          <li><a href="#ticket">Ingresso</a></li>
        </nav>
      </div>
    </header>
  )
}

function Footer({ faqItems, expandedFaq, toggleFaq }) {
  const sponsors = [
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Yamaha', color: '#000000' },
    { name: 'Roland', color: '#FF6600' },
    { name: 'JBL', color: '#0066CC' }
  ]

  return (
    <footer>
      <div className="footer-content">
        <section className="sponsors-section">
          <h3>Parceiros Oficiais</h3>
          <div className="sponsors-grid">
            {sponsors.map((sponsor, idx) => (
              <div key={idx} className="sponsor-badge">
                <div className="sponsor-logo" style={{ backgroundColor: sponsor.color }}>
                  {sponsor.name.charAt(0)}
                </div>
                <p>{sponsor.name}</p>
              </div>
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
          <p>&copy; 2024 Noite de Gala do Saxofone. Todos os direitos reservados.</p>
          <p>
            Contato: <a href="mailto:eventos@saxofone.com">eventos@saxofone.com</a> |
            <a href="tel:+5511300000000"> (11) 3000-0000</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
