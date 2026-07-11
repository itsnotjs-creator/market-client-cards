import Link from 'next/link';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer__grid">
          <div className="footer__col">
            <h4>PERFUMES VIP</h4>
            <p>Tu tienda de confianza en perfumes 100% originales. Las mejores marcas a los mejores precios, con envíos a todo Chile.</p>
          </div>

          <div className="footer__col">
            <h4>Navegación</h4>
            <Link href="/">Inicio</Link>
            <Link href="/productos">Perfumes</Link>
            <Link href="/productos?q=novedades">Novedades</Link>
            <Link href="/productos?q=ofertas">Ofertas</Link>
          </div>

          <div className="footer__col">
            <h4>Ayuda</h4>
            <Link href="/contacto">Contáctanos</Link>
            <Link href="/empresa">Sobre nosotros</Link>
            <Link href="/perfil">Mi cuenta</Link>
            <Link href="/login">Iniciar sesión</Link>
          </div>

          <div className="footer__col">
            <h4>Contacto</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PhoneOutlinedIcon fontSize="small" />
              +56 2 2549 5300
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <EmailOutlinedIcon fontSize="small" />
              ventas@perfumesvip.cl
            </p>
            <Link href="/contacto" className="footer__gold-link">
              Formulario de contacto →
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} PERFUMES VIP. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}