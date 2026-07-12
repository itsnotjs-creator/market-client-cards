export const metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web PerfumesVIP",
};

export default function TerminosPage() {
  return (
    <main className="legal-page">
      <div className="page-shell">
        <h1 className="legal-page__title">Términos y Condiciones</h1>
        <p className="legal-page__subtitle">PerfumesVIP</p>

        <p className="legal-page__intro">
          Bienvenido a PerfumesVIP. Estos términos y condiciones establecen las
          reglas y regulaciones para el uso del sitio web{" "}
          <a href="https://perfumesvip.cl" className="legal-page__link">
            https://perfumesvip.cl
          </a>
          .
        </p>
        <p>
          Al acceder a este sitio web, asumimos que aceptas estos términos y
          condiciones en su totalidad. Si no estás de acuerdo con alguno de los
          términos aquí establecidos, te recomendamos no utilizar este sitio.
        </p>

        <h2 className="legal-page__heading">1. Definiciones</h2>
        <p>Para efectos de estos Términos y Condiciones:</p>
        <ul>
          <li>
            <strong>Cliente, Usuario, Usted:</strong> Persona que accede y
            utiliza este sitio web.
          </li>
          <li>
            <strong>La Empresa, Nosotros, Nuestro:</strong> PerfumesVIP.
          </li>
          <li>
            <strong>Sitio web:</strong> https://perfumesvip.cl
          </li>
        </ul>

        <h2 className="legal-page__heading">2. Uso del sitio web</h2>
        <p>
          El usuario se compromete a utilizar el sitio web de manera
          responsable, respetando la legislación vigente en Chile, la moral y
          las buenas costumbres.
        </p>
        <p>Queda prohibido:</p>
        <ul>
          <li>Realizar actividades ilícitas o fraudulentas.</li>
          <li>Introducir virus o cualquier tecnología dañina.</li>
          <li>Intentar acceder a sistemas restringidos del sitio.</li>
        </ul>

        <h2 className="legal-page__heading">3. Productos y precios</h2>
        <p>PerfumesVIP ofrece perfumes y productos relacionados.</p>
        <ul>
          <li>
            Todos los precios están expresados en pesos chilenos (CLP) e
            incluyen IVA, salvo que se indique lo contrario.
          </li>
          <li>
            Nos reservamos el derecho de modificar precios, promociones o
            disponibilidad de productos sin previo aviso.
          </li>
          <li>
            Las imágenes son referenciales y pueden presentar ligeras
            variaciones.
          </li>
        </ul>

        <h2 className="legal-page__heading">4. Proceso de compra</h2>
        <p>Al realizar una compra en el sitio:</p>
        <ul>
          <li>El usuario selecciona los productos.</li>
          <li>Completa sus datos de envío y pago.</li>
          <li>Recibe una confirmación del pedido.</li>
        </ul>
        <p>
          La validación del pago es condición necesaria para procesar el
          pedido.
        </p>
        <p>PerfumesVIP se reserva el derecho de cancelar pedidos en caso de:</p>
        <ul>
          <li>Problemas con el pago.</li>
          <li>Errores evidentes en precios o stock.</li>
          <li>Sospecha de fraude.</li>
        </ul>

        <h2 className="legal-page__heading">5. Envíos</h2>
        <ul>
          <li>Los envíos se realizan dentro del territorio de Chile.</li>
          <li>
            Los plazos de entrega son referenciales y pueden variar según la
            empresa de transporte.
          </li>
          <li>
            El costo de envío será informado antes de finalizar la compra.
          </li>
        </ul>
        <p>
          PerfumesVIP no se hace responsable por retrasos atribuibles a
          terceros (couriers).
        </p>

        <h2 className="legal-page__heading">6. Cambios y devoluciones</h2>
        <p>De acuerdo con la legislación chilena:</p>
        <ul>
          <li>
            El cliente puede solicitar cambios o devoluciones en caso de
            productos defectuosos o errores en el pedido.
          </li>
          <li>
            El producto debe estar sin uso, en su empaque original y con todos
            sus accesorios.
          </li>
        </ul>
        <p>
          Para solicitar un cambio o devolución, el cliente debe contactarse a
          través de los canales oficiales del sitio.
        </p>

        <h2 className="legal-page__heading">7. Propiedad intelectual</h2>
        <p>
          Todo el contenido del sitio web (textos, imágenes, logos, diseño,
          etc.) es propiedad de PerfumesVIP o cuenta con autorización para su
          uso.
        </p>
        <ul>
          <li>
            Reproducir, copiar o distribuir contenido sin autorización.
          </li>
          <li>Usar material del sitio con fines comerciales sin consentimiento.</li>
        </ul>

        <h2 className="legal-page__heading">8. Cookies</h2>
        <p>
          Este sitio utiliza cookies para mejorar la experiencia del usuario.
          Al navegar en el sitio, aceptas el uso de cookies conforme a nuestra
          política de privacidad.
        </p>

        <h2 className="legal-page__heading">9. Responsabilidad</h2>
        <p>PerfumesVIP no será responsable por:</p>
        <ul>
          <li>Interrupciones del servicio del sitio web.</li>
          <li>Errores técnicos o fallas de terceros.</li>
          <li>Uso indebido del sitio por parte de los usuarios.</li>
        </ul>
        <p>
          En la medida permitida por la ley, no garantizamos que el sitio
          esté libre de errores o interrupciones.
        </p>

        <h2 className="legal-page__heading">10. Protección de datos</h2>
        <p>
          Los datos personales proporcionados por el usuario serán tratados
          conforme a la legislación vigente en Chile.
        </p>
        <ul>
          <li>Procesar pedidos.</li>
          <li>Contactar al cliente.</li>
          <li>Mejorar la experiencia de compra.</li>
        </ul>
        <p>
          No se compartirán datos con terceros sin consentimiento, salvo
          obligación legal.
        </p>

        <h2 className="legal-page__heading">11. Legislación aplicable</h2>
        <p>
          Estos términos y condiciones se rigen por las leyes de la República
          de Chile. Cualquier controversia será sometida a los tribunales
          competentes del país.
        </p>

        <h2 className="legal-page__heading">12. Modificaciones</h2>
        <p>
          PerfumesVIP podrá modificar estos términos y condiciones en
          cualquier momento. Los cambios entrarán en vigencia desde su
          publicación en el sitio web.
        </p>

        <h2 className="legal-page__heading">13. Contacto</h2>
        <p>
          Para consultas o reclamos, puedes comunicarte a través de los
          canales disponibles en el sitio web{" "}
          <a href="https://perfumesvip.cl" className="legal-page__link">
            https://perfumesvip.cl
          </a>
          .
        </p>
      </div>
    </main>
  );
}