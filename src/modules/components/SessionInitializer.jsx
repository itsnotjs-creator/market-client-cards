'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function SessionInitializer() {
  const initializeSession = useAuthStore((state) => state.initializeSession);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      initializeSession();
    }
  }, [initializeSession]);

  return null;
}
