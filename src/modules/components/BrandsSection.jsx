const brands = [
  { name: 'KEKO', color: '#e63946' },
  { name: 'AEROKLAS', color: '#2196F3' },
  { name: 'TYC', color: '#1565C0' },
  { name: 'BNORACK', color: '#333333' },
  { name: 'DLZ', color: '#d32f2f' },
  { name: 'GSP', color: '#1976D2' },
  { name: 'KINZO', color: '#FF6F00' },
  { name: 'DANAHER', color: '#0D47A1' },
  { name: 'CAUPLAS', color: '#333333' },
  { name: 'HIPPER FREIOS', color: '#C62828' },
];

export default function BrandsSection() {
  return (
    <section className="brands">
      <div className="page-shell">
        <h2 className="brands__title">Marcas que distribuimos</h2>
        <div className="brands__scroll">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="brand-logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px',
                height: '36px',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: brand.color,
                letterSpacing: '0.05em',
              }}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
