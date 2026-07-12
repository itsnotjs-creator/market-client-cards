import Hero from '../modules/components/Hero';

export const metadata = {
  title: 'Inicio',
  description: 'Perfumes VIP - Perfumes 100% originales. Envíos a todo Chile.',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}