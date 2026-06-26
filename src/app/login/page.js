"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, SESSION_STATUS } from "../../store/authStore";
import LoginForm from "../../modules/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (status === SESSION_STATUS.AUTHENTICATED && session?.user) {
      router.push("/catalogo");
    }
  }, [status, session, router]);

  if (status === SESSION_STATUS.AUTHENTICATED && session?.user) {
    return (
      <main style={{ padding: "3rem 0", flex: 1 }}>
        <div className="page-shell">
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p>Redirigiendo...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "3rem 0", flex: 1 }}>
      <div className="page-shell">
        <LoginForm compact={false} />
      </div>
    </main>
  );
}
