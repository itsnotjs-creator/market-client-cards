'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';

export default function AppInitializer() {
  const initializeSession = useAuthStore((state) => state.initializeSession);
  const loadConfig = useConfigStore((state) => state.loadConfig);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      loadConfig();
      initializeSession();
    }
  }, [initializeSession, loadConfig]);

  return null;
}