import CatalogoHeader from "../../modules/components/CatalogoHeader";
import "./catalogo.css";

export const metadata = {
  title: "Catálogo",
  description: "Catálogo de productos - Importadora Cuatro Ruedas",
};

export default function CatalogoLayout({ children }) {
  return (
    <>
      <CatalogoHeader />
      {children}
    </>
  );
}
