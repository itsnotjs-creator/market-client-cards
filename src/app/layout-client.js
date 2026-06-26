'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '../modules/components/SiteHeader';
import ConditionalFooter from '../modules/components/ConditionalFooter';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideGlobalLayout = pathname.startsWith('/catalogo');

  return (
    <div className="shell">
      {!hideGlobalLayout && <SiteHeader />}
      {children}
      {!hideGlobalLayout && <ConditionalFooter />}
    </div>
  );
}
