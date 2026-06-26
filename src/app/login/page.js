import LoginForm from '../../modules/components/LoginForm';

export const metadata = {
  title: 'Iniciar Sesión',
  description: 'Accede a tu cuenta de Importadora Cuatro Ruedas',
};

export default function LoginPage() {
  return (
    <main style={{ padding: '3rem 0', flex: 1 }}>
      <div className="page-shell">
        <LoginForm compact={false} />
      </div>
    </main>
  );
}
