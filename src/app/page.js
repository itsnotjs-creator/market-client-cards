import Hero from '../modules/components/Hero';
import FeaturesSection from '../modules/components/FeaturesSection';
import BrandsSection from '../modules/components/BrandsSection';
import InfoSection from '../modules/components/InfoSection';

export const metadata = {
  title: 'Inicio',
  description: 'Importadora Cuatro Ruedas - Distribuyendo soluciones automotrices desde 1981',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <BrandsSection />
      <InfoSection />
    </main>
  );
}
