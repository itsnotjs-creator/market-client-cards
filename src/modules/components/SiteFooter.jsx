import Link from 'next/link';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer__grid">
          <div className="footer__col">
            <h4>Importadora Cuatro Ruedas</h4>
            <p>Desde 1981 entregando soluciones de calidad al mercado automotriz chileno.</p>
          </div>

          <div className="footer__col">
            <h4>Casa Matriz</h4>
            <p>Río Clarillo 1258, Parque Industrial ENEA</p>
            <p>Pudahuel, Santiago - Chile</p>
            <Link href="https://maps.google.com" className="footer__col-link" style={{ color: 'var(--blue-light)', fontSize: '0.82rem' }}>
              Ver en Google Maps
            </Link>
          </div>

          <div className="footer__col">
            <h4>Contacto</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PhoneOutlinedIcon fontSize="small" />
              +56 2 2549 5300
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <EmailOutlinedIcon fontSize="small" />
              ventas@cuatroruedas.cl
            </p>
            <Link href="/contacto" style={{ color: 'var(--blue-light)', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
              Formulario de contacto
            </Link>
          </div>

          <div className="footer__col">
            <h4>¿Quieres ser cliente?</h4>
            <p>Completa el formulario y nuestro equipo comercial se pondrá en contacto contigo.</p>
            <Link href="/hazte-cliente" style={{ color: 'var(--blue-light)', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
              Hazte cliente aquí
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} Importadora Cuatro Ruedas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
