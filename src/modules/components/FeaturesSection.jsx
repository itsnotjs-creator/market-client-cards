import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';

const features = [
  {
    icon: <PercentOutlinedIcon fontSize="large" />,
    title: 'Precios exclusivos',
    description: 'Accede a nuestros descuentos especiales por volumen y condiciones comerciales.',
  },
  {
    icon: <CategoryOutlinedIcon fontSize="large" />,
    title: 'Amplio catálogo',
    description: 'Repuestos para todas las marcas y modelos con actualización constante de stock.',
  },
  {
    icon: <LocalShippingOutlinedIcon fontSize="large" />,
    title: 'Despachos rápidos',
    description: 'Entregamos a todo Chile con logística propia y partners estratégicos.',
  },
  {
    icon: <HeadsetMicOutlinedIcon fontSize="large" />,
    title: 'Soporte especializado',
    description: 'Nuestro equipo de ejecutivos está listo para ayudarte en lo que necesites.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="features">
      <div className="page-shell">
        <div className="features__grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <div className="feature-card__content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
