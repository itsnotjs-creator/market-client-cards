export const metadata = {
  title: "Política de Reembolsos",
  description: "Política de reembolsos y devoluciones de PerfumesVIP",
};

export default function ReembolsosPage() {
  return (
    <main className="legal-page">
      <div className="page-shell">
        <h1 className="legal-page__title">Política de Reembolsos</h1>
        <p className="legal-page__subtitle">PerfumesVIP</p>

        <p className="legal-page__intro">
          ¡Gracias por comprar en PerfumesVIP!
        </p>
        <p>
          Ofrecemos la posibilidad de cambios y/o devoluciones dentro de los
          primeros 10 días corridos desde la recepción del producto. Si han
          transcurrido más de 10 días, no podremos ofrecer reembolso o cambio.
        </p>

        <h2 className="legal-page__heading">
          1. Elegibilidad para cambios y devoluciones
        </h2>
        <p>Para ser elegible, se deben cumplir las siguientes condiciones:</p>
        <ul>
          <li>
            El producto debe estar sin uso y en las mismas condiciones en que
            fue recibido.
          </li>
          <li>
            Debe conservar su embalaje original, incluyendo caja, celofán y
            sellos intactos.
          </li>
          <li>Debe presentarse el comprobante de compra.</li>
          <li>
            El producto no debe haber sido abierto ni manipulado (por tratarse
            de productos de uso personal).
          </li>
        </ul>

        <h2 className="legal-page__heading">2. Productos no elegibles</h2>
        <p>No se aceptan devoluciones ni cambios en los siguientes casos:</p>
        <ul>
          <li>Productos abiertos o usados.</li>
          <li>Productos sin su embalaje original.</li>
          <li>Productos en promoción o con descuento (salvo falla).</li>
          <li>
            Artículos de uso personal que no puedan ser revendidos por razones
            de higiene.
          </li>
        </ul>

        <h2 className="legal-page__heading">
          3. Productos defectuosos o error en el pedido
        </h2>
        <p>Si recibes un producto:</p>
        <ul>
          <li>Defectuoso</li>
          <li>Dañado durante el transporte</li>
          <li>Diferente al solicitado</li>
        </ul>
        <p>
          Podrás solicitar un cambio o reembolso. En este caso, PerfumesVIP
          asumirá los costos de envío asociados.
        </p>

        <h2 className="legal-page__heading">4. Proceso de solicitud</h2>
        <p>
          Para iniciar una solicitud, debes contactarnos a través de los
          canales disponibles en nuestro sitio web:{" "}
          <a href="https://perfumesvip.cl" className="legal-page__link">
            https://perfumesvip.cl
          </a>
        </p>
        <p>Debes incluir:</p>
        <ul>
          <li>Número de pedido</li>
          <li>Descripción del problema</li>
          <li>Evidencia (fotos o videos si aplica)</li>
        </ul>

        <h2 className="legal-page__heading">5. Evaluación y resolución</h2>
        <p>Una vez recibido el producto:</p>
        <ul>
          <li>Será inspeccionado para verificar su estado.</li>
          <li>
            Te notificaremos si el reembolso o cambio es aprobado o
            rechazado.
          </li>
        </ul>
        <p>Si es aprobado:</p>
        <ul>
          <li>
            El reembolso se realizará mediante el mismo método de pago
            utilizado.
          </li>
          <li>
            El plazo dependerá de la entidad bancaria o medio de pago.
          </li>
        </ul>

        <h2 className="legal-page__heading">
          6. Reembolsos atrasados o no recibidos
        </h2>
        <p>Si no has recibido tu reembolso:</p>
        <ul>
          <li>Verifica tu cuenta bancaria.</li>
          <li>Contacta a tu banco o proveedor de pago.</li>
          <li>
            Si el problema persiste, contáctanos a través del sitio web.
          </li>
        </ul>

        <h2 className="legal-page__heading">7. Costos de envío</h2>
        <ul>
          <li>
            Los costos de envío no son reembolsables, salvo en casos de error o
            falla atribuible a PerfumesVIP.
          </li>
          <li>
            Si se aprueba un reembolso, el costo de envío puede ser descontado
            del monto total.
          </li>
          <li>
            El cliente es responsable del envío en devoluciones voluntarias.
          </li>
        </ul>

        <h2 className="legal-page__heading">8. Consideraciones importantes</h2>
        <ul>
          <li>
            No podemos garantizar la recepción de devoluciones enviadas sin
            seguimiento.
          </li>
          <li>
            Los tiempos de cambio pueden variar según la ubicación dentro de
            Chile.
          </li>
        </ul>
      </div>
    </main>
  );
}