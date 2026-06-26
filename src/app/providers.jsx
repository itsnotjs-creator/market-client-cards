'use client';

import { CssVarsProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import SessionInitializer from '../modules/components/SessionInitializer';

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <CssVarsProvider theme={theme} defaultMode="light">
        <CssBaseline />
        <SessionInitializer />
        {children}
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
}
