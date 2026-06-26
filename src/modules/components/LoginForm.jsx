"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";
import { handleApiError } from "../../lib/errorHandler";

export default function LoginForm({ compact = false }) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const isSubmitting = status === SESSION_STATUS.AUTHENTICATING;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rut || !password) return;

    try {
      await login({ rut, password });

      if (compact) {
        router.push("/perfil");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  if (compact) {
    return (
      <div className="login-card">
        <h2 className="login-card__title">Acceso a Carro de Compras</h2>
        <p className="login-card__subtitle">
          Ingresa con tus credenciales para ver precios y realizar pedidos.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-card__field">
            <label htmlFor="rut">RUT Empresa</label>
            <input
              type="text"
              id="rut"
              placeholder="Ej: 76.123.456-7"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="login-card__field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {/* <div className="login-card__options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recordar mis datos
            </label>
            <Link href="/recuperar-password">¿Olvidaste tu contraseña?</Link>
          </div> */}
          <button
            type="submit"
            className="login-card__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="login-card__footer">
          ¿Aún no eres cliente?{" "}
          <Link href="/hazte-cliente">Hazte cliente aquí</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-card" style={{ maxWidth: "480px", margin: "0 auto" }}>
      <h2
        className="login-card__title"
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        Iniciar Sesión
      </h2>
      <p
        className="login-card__subtitle"
        style={{ textAlign: "center", marginBottom: "1.5rem" }}
      >
        Accede con tu RUT y contraseña
      </p>

      <form onSubmit={handleSubmit}>
        <div className="login-card__field">
          <label htmlFor="rut-full">RUT Empresa</label>
          <input
            type="text"
            id="rut-full"
            placeholder="Ej: 76.123.456-7"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="login-card__field">
          <label htmlFor="password-full">Contraseña</label>
          <input
            type="password"
            id="password-full"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        {/* <div className="login-card__options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Recordar mis datos
          </label>
          <Link href="/recuperar-password">¿Olvidaste tu contraseña?</Link>
        </div> */}
        <button
          type="submit"
          className="login-card__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="login-card__footer">
        ¿Aún no eres cliente?{" "}
        <Link href="/hazte-cliente">Hazte cliente aquí</Link>
      </div>
    </div>
  );
}
