import Link from 'next/link';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const infoCards = [
  {
    icon: <BusinessOutlinedIcon fontSize="large" />,
    title: 'Importadora Cuatro Ruedas',
    description: 'Desde 1981 entregando soluciones de calidad al mercado automotriz chileno.',
    link: { href: '/empresa', label: 'Conoce más sobre nosotros' },
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="large" />,
    title: 'Casa Matriz',
    description: 'Río Clarillo 1258, Parque Industrial ENEA, Pudahuel, Santiago - Chile',
    link: { href: 'https://maps.google.com', label: 'Ver en Google Maps', external: true },
  },
  {
    icon: <PhoneOutlinedIcon fontSize="large" />,
    title: 'Contacto',
    description: 'Teléfono: +56 2 2549 5300\nEmail: ventas@cuatroruedas.cl',
    link: { href: '/contacto', label: 'Formulario de contacto' },
  },
  {
    icon: <GroupOutlinedIcon fontSize="large" />,
    title: '¿Quieres ser cliente?',
    description: 'Completa el formulario y nuestro equipo comercial se pondrá en contacto contigo.',
    link: { href: '/hazte-cliente', label: 'Hazte cliente aquí' },
  },
];

export default function InfoSection() {
  return (
    <section className="info-section">
      <div className="page-shell">
        <div className="info-section__grid">
          {infoCards.map((card) => (
            <div key={card.title} className="info-card">
              <div className="info-card__icon">
                {card.icon}
              </div>
              <div className="info-card__content">
                <h3>{card.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{card.description}</p>
                <Link href={card.link.href} className="info-card__link" {...(card.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {card.link.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
