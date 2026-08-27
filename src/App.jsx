import { useState } from 'react'
import './App.css'
import giancarloPhoto from './assets/giancarlo.jpg'
import amarildoPhoto from './assets/amarildo.jpeg'
import ciasaxPhoto from './assets/ciasax.jpeg'
import josePhoto from './assets/jose.png'

const TICKET_URL = 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=42e5ad53530a4ae93c15f3a154ceea4d'

const SPONSOR_TIERS = [
  { label: 'Patrocinar o Evento com R$ 15', url: 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=2c6973b9c5386688db9e33da21ed6e22' },
  { label: 'Patrocinar o Evento com R$ 30', url: 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=af70fffde4e5893dc78e1e53f973acf7' },
  { label: 'Patrocinar o Evento com R$ 50', url: 'https://www.sympla.com.br/evento/1-encontro-do-grupo-sax-ccb-erudito-sacro/3555244?token=f45e7e938dd59340c1f0ddf8d24e2940' }
]

function App() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [showSponsorModal, setShowSponsorModal] = useState(false)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqItems = [
    {
      question: 'Qual é a data e local do evento?',
      answer: 'A Comemoração de 10 anos do Grupo SAX CCB-ERUDITO-SACRO ocorre na Faculdade Uni Santana, localizada na Rua Voluntários da Pátria, 257 - Próximo ao Metrô Tietê (Linha Azul). A data e horário completos estão disponíveis na seção de cronograma.'
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
      answer: 'Se necessitar de acomodações especiais, entre em contato pelo email encontrosaxofone@gmail.com com antecedência.'
    },
    {
      question: 'Está incluso almoço?',
      answer: 'O almoço não está incluso no ingresso. No local há restaurante disponível da própria Faculdade Uni Santana, além de outras opções de almoço na região.'
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
      photo: giancarloPhoto
    },
    {
      name: 'Como ser uma Referência Sonora',
      role: 'Com Amarildo Nascimento',
      bio: 'Caminhos e práticas para desenvolver uma sonoridade autêntica e marcante ao saxofone.',
      photo: amarildoPhoto
    },
    {
      name: 'Concerto Especial',
      role: 'CiaSax',
      bio: 'Apresentação musical especial em celebração aos 10 anos do Grupo SAX CCB-ERUDITO-SACRO.',
      photo: ciasaxPhoto
    },
    {
      name: 'A Arte de Tocar Junto',
      role: 'Com José de Carvalho',
      bio: 'Afinação Coletiva, Equilíbrio sonoro e escuta ativa. Realizando aplicação prática nos hinos com Giancarlo Medeiros.',
      photo: josePhoto
    }
  ]

  const schedule = [
    { time: '08:00 às 09:00', event: 'Credenciamento & Café de Boas Vindas', description: '' },
    { time: '09:00 às 09:30', event: 'Cerimônia de Abertura - Uma Década', description: '' },
    { time: '09:30 às 10:30', event: 'O Saxofone que Venceu o Tempo', description: 'Com Giancarlo Medeiros' },
    { time: '10:30 às 11:30', event: 'Como ser uma Referência Sonora', description: 'Com Amarildo Nascimento' },
    { time: '11:30 às 12:30', event: 'Seu Saxofone está trabalhando a seu favor?', description: 'Com Caio Henrique' },
    { time: '12:30 às 14:00', event: 'Pausa para Almoço e Convivência', description: '' },
    { time: '14:00 às 14:50', event: 'Concerto Especial - CiaSax', description: '' },
    { time: '14:50 às 15:10', event: 'Espaço Parceiros Oficiais', description: '' },
    { time: '15:10 às 16:10', event: 'A Arte de Tocar Junto', description: 'Com Giancarlo Medeiros e José de Carvalho' },
    { time: '16:10 às 16:30', event: 'Espaço Sax Experience com os Expositores', description: '' },
    { time: '16:30 às 17:00', event: 'O Grande Encerramento e Reconhecimentos', description: '' }
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
                  <img src={presentation.photo} alt={presentation.name} />
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
              <h3>Faculdade Uni Santana</h3>
              <div className="location-details">
                <p><strong>Endereço:</strong> Rua Voluntários da Pátria, 257<br />Próximo ao Metrô Tietê (Linha Azul)</p>
                <p><strong>Telefone:</strong> (15) 99717-4741 (Giancarlo)<br />(11) 94174-3352 (José de Carvalho)</p>
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
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '-1.2rem', marginBottom: '1.5rem' }}>
                + R$ 12,50 de taxas da plataforma
              </p>
              <ul>
                <li>Acesso a todas as apresentações do dia</li>
                <li>Intervalo com coffee break</li>
                <li>Networking com saxofonistas profissionais</li>
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

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header>
      <div className="header-content">
        <div className="logo">🎷 SAXOFONE</div>
        <nav className={`nav${isMenuOpen ? ' nav-open' : ''}`}>
          <li><a href="#about" onClick={closeMenu}>Sobre</a></li>
          <li><a href="#presentations" onClick={closeMenu}>Apresentações</a></li>
          <li><a href="#schedule" onClick={closeMenu}>Cronograma</a></li>
          <li><a href="#ticket" onClick={closeMenu}>Ingresso</a></li>
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
            <a href="tel:+5515997174741"> (15) 99717-4741</a> (Giancarlo) |
            <a href="tel:+5511941743352"> (11) 94174-3352</a> (José de Carvalho)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
