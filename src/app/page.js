import Hero from '../modules/components/Hero';
import RelevantBanner from '../modules/components/RelevantBanner';

export const metadata = {
  title: 'Inicio',
  description: 'Importadora Cuatro Ruedas - Distribuyendo soluciones automotrices desde 1981',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <RelevantBanner />
    </main>
  );
}
