import ContactSection from '../../modules/components/ContactSection';

export const metadata = {
  title: 'Contacto',
  description: 'Contáctanos en PerfumesVIP. Envíanos tus dudas, consultas o sugerencias.',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="page-shell">
        <ContactSection />
      </div>
    </main>
  );
}
