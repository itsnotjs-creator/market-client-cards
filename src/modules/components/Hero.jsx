'use client';

import Link from 'next/link';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LoginForm from './LoginForm';

export default function Hero() {
  return (
    <section className="hero">
      <div className="page-shell hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Todo en repuestos<br />
            <span>para tu negocio</span>
          </h1>
          <p className="hero__copy">
            Más de 40 años abasteciendo a talleres y tiendas de repuestos en todo Chile con calidad, stock y los mejores precios.
          </p>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-icon">
                <CalendarMonthOutlinedIcon />
              </div>
              <div className="hero__stat-text">
                <strong>+40 años</strong>
                <span>de experiencia</span>
              </div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-icon">
                <Inventory2OutlinedIcon />
              </div>
              <div className="hero__stat-text">
                <strong>+10.000</strong>
                <span>productos</span>
              </div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-icon">
                <LocalShippingOutlinedIcon />
              </div>
              <div className="hero__stat-text">
                <strong>Cobertura</strong>
                <span>a todo Chile</span>
              </div>
            </div>
          </div>
        </div>

        <LoginForm compact={true} />
      </div>
    </section>
  );
}
