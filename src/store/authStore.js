'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/auth.service';
import { setForbiddenHandler } from '../lib/fetch.service';

export const SESSION_STATUS = {
  IDLE: 'idle',
  CHECKING: 'checking',
  ANONYMOUS: 'anonymous',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
};

const normalizeSession = (sessionResponse) => {
  if (!sessionResponse) return null;
  if (sessionResponse.session && sessionResponse.user) return sessionResponse;
  return null;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      session: null,
      status: SESSION_STATUS.IDLE,
      error: null,

      initializeSession: async () => {
        if (get().status === SESSION_STATUS.CHECKING) return;

        set({ status: SESSION_STATUS.CHECKING, error: null });

        try {
          const session = normalizeSession(await authService.getSession());

          set({
            session,
            status: session ? SESSION_STATUS.AUTHENTICATED : SESSION_STATUS.ANONYMOUS,
            error: null,
          });
        } catch (error) {
          if (error?.status === 401 || error?.status === 403) {
            set({ session: null, status: SESSION_STATUS.ANONYMOUS, error: null });
            return;
          }

          set({
            session: null,
            status: SESSION_STATUS.ANONYMOUS,
            error: error?.message || 'No se pudo validar la sesión',
          });
        }
      },

      login: async ({ rut, password }) => {
        set({ status: SESSION_STATUS.AUTHENTICATING, error: null });

        try {
          await authService.signInWithRut({ rut, password });
          const session = normalizeSession(await authService.getSession());

          if (!session) {
            throw new Error('La sesión no quedó disponible después del login');
          }

          set({
            session,
            status: SESSION_STATUS.AUTHENTICATED,
            error: null,
          });
          return session;
        } catch (error) {
          set({
            session: null,
            status: SESSION_STATUS.ANONYMOUS,
            error: error?.message || 'No se pudo iniciar sesión',
          });
          throw error;
        }
      },

      logout: async () => {
        set({ status: SESSION_STATUS.CHECKING, error: null });

        try {
          await authService.signOut();
        } catch (_) {
        }

        if (typeof document !== 'undefined') {
          document.cookie.split(';').forEach((cookie) => {
            const name = cookie.split('=')[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          });
        }

        set({
          session: null,
          status: SESSION_STATUS.ANONYMOUS,
          error: null,
        });
      },

      handleForbiddenLogout: () => {
        set({
          session: null,
          status: SESSION_STATUS.ANONYMOUS,
          error: null,
        });

        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.replace('/login');
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'cuatro-ruedas-auth',
      partialize: (state) => ({
        session: state.session,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState || {};
        const hasSession = Boolean(persisted.session?.user);

        return {
          ...currentState,
          ...persisted,
          status: hasSession ? SESSION_STATUS.AUTHENTICATED : SESSION_STATUS.IDLE,
        };
      },
    }
  )
);

setForbiddenHandler(() => useAuthStore.getState().handleForbiddenLogout());
