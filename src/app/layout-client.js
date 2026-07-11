'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '../modules/components/SiteHeader';
import ConditionalFooter from '../modules/components/ConditionalFooter';
import AppInitializer from '../modules/components/AppInitializer';
import MaintenanceMode from '../modules/components/MaintenanceMode';
import { useConfigStore, CONFIG_STATUS } from '../store/configStore';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideGlobalLayout = pathname.startsWith('/catalogo');
  const configSettings = useConfigStore((state) => state.settings);
  const configStatus = useConfigStore((state) => state.status);

  const isMaintenance = configSettings.maintenanceMode;

  // While config is loading, show nothing (avoids flash)
  // A quick skeleton could go here, but keeping it simple for template
  if (configStatus === CONFIG_STATUS.IDLE || configStatus === CONFIG_STATUS.LOADING) {
    return (
      <div className="shell">
        <AppInitializer />
      </div>
    );
  }

  if (isMaintenance) {
    return (
      <div className="shell">
        <AppInitializer />
        <MaintenanceMode />
      </div>
    );
  }

  return (
    <div className="shell">
      <AppInitializer />
      {!hideGlobalLayout && <SiteHeader />}
      {children}
      {!hideGlobalLayout && <ConditionalFooter />}
    </div>
  );
}