import './globals.css';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Inter } from 'next/font/google';
import Providers from './providers';
import SiteHeader from '../modules/components/SiteHeader';
import SiteFooter from '../modules/components/SiteFooter';

const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata = {
  title: {
    default: 'Importadora Cuatro Ruedas - Repuestos Automotrices',
    template: '%s | Importadora Cuatro Ruedas',
  },
  description: 'Distribuyendo soluciones automotrices desde 1981. Repuestos para talleres y tiendas en todo Chile.',
  keywords: ['repuestos', 'automotriz', 'Chile', 'talleres', 'importadora'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={bodyFont.variable}
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript defaultMode="light" />
        <Providers>
          <div className="shell">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
