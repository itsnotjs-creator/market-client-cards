'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function SessionInitializer() {
  const initializeSession = useAuthStore((state) => state.initializeSession);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return null;
}
