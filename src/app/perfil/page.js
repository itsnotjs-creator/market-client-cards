'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, SESSION_STATUS } from '../../store/authStore';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (status === SESSION_STATUS.ANONYMOUS) {
      router.push('/login');
    }
  }, [status, router]);

  if (status === SESSION_STATUS.CHECKING || status === SESSION_STATUS.IDLE) {
    return (
      <main style={{ padding: '3rem 0', flex: 1 }}>
        <div className="page-shell">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Cargando...</p>
          </div>
        </div>
      </main>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <main style={{ padding: '3rem 0', flex: 1 }}>
      <div className="page-shell">
        <div className="page-header">
          <h1 className="page-header__title">Mi Perfil</h1>
          <p className="page-header__subtitle">
            Bienvenido, {session?.user?.name || session?.user?.email || 'Cliente'}
          </p>
        </div>

        <div className="form-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 className="form-section__title">Información de la Cuenta</h2>
            <div className="form-grid">
              <div className="form-field">
                <label>Nombre</label>
                <input type="text" value={session?.user?.name || ''} readOnly />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input type="email" value={session?.user?.email || ''} readOnly />
              </div>
              <div className="form-field">
                <label>RUT Empresa</label>
                <input type="text" value={session?.user?.rut || ''} readOnly />
              </div>
              <div className="form-field">
                <label>Razón Social</label>
                <input type="text" value={session?.user?.companyName || ''} readOnly />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link href="/pedidos" className="site-header__btn site-header__btn--primary">
              Ver Pedidos
            </Link>
            <button onClick={handleLogout} className="site-header__btn site-header__btn--outline">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
