'use client';

import { useConfigStore } from '../../store/configStore';

export default function MaintenanceMode() {
  const settings = useConfigStore((state) => state.settings);

  return (
    <div className="maintenance">
      <div className="maintenance__card">
        <h1 className="maintenance__title">En Mantenimiento</h1>
        <p className="maintenance__text">
          Estamos trabajando para mejorar tu experiencia.
          Volveremos pronto.
        </p>
        <div className="maintenance__badge">PERFUMES VIP</div>
      </div>
    </div>
  );
}