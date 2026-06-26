'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const regiones = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana de Santiago',
  "O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
];

const clientSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(8, 'Teléfono requerido'),
  razonSocial: z.string().min(2, 'Razón social requerida'),
  rutEmpresa: z.string().min(8, 'RUT empresa requerido'),
  emailEmpresa: z.string().email('Email empresa inválido').optional().or(z.literal('')),
  telefonoEmpresa: z.string().min(8, 'Teléfono empresa requerido'),
  region: z.string().min(1, 'Región requerida'),
  ciudad: z.string().min(1, 'Ciudad requerida'),
  comuna: z.string().min(1, 'Comuna requerida'),
  direccion: z.string().min(5, 'Dirección requerida'),
  web: z.string().url('URL inválida').optional().or(z.literal('')),
  comentarios: z.string().optional(),
});

export default function HazteClientePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main style={{ padding: '3rem 0', flex: 1 }}>
        <div className="page-shell">
          <div className="form-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h1 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>¡Solicitud enviada!</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Nuestro equipo comercial se pondrá en contacto contigo a la brevedad.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem 0', flex: 1 }}>
      <div className="page-shell">
        <div className="page-header">
          <h1 className="page-header__title">Hazte Cliente</h1>
          <p className="page-header__subtitle">
            Completa el formulario y nuestro equipo comercial se pondrá en contacto contigo.
          </p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-section">
              <h2 className="form-section__title">Datos del Contacto</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    id="nombre"
                    type="text"
                    className={errors.nombre ? 'error' : ''}
                    {...register('nombre')}
                  />
                  {errors.nombre && <span className="error-text">{errors.nombre.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    className={errors.email ? 'error' : ''}
                    {...register('email')}
                  />
                  {errors.email && <span className="error-text">{errors.email.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    id="telefono"
                    type="tel"
                    className={errors.telefono ? 'error' : ''}
                    {...register('telefono')}
                  />
                  {errors.telefono && <span className="error-text">{errors.telefono.message}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section__title">Datos de la Empresa</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="razonSocial">Razón Social *</label>
                  <input
                    id="razonSocial"
                    type="text"
                    className={errors.razonSocial ? 'error' : ''}
                    {...register('razonSocial')}
                  />
                  {errors.razonSocial && <span className="error-text">{errors.razonSocial.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="rutEmpresa">RUT Empresa *</label>
                  <input
                    id="rutEmpresa"
                    type="text"
                    placeholder="Ej: 76.123.456-7"
                    className={errors.rutEmpresa ? 'error' : ''}
                    {...register('rutEmpresa')}
                  />
                  {errors.rutEmpresa && <span className="error-text">{errors.rutEmpresa.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="emailEmpresa">Email Empresa <span className="optional">(opcional)</span></label>
                  <input
                    id="emailEmpresa"
                    type="email"
                    className={errors.emailEmpresa ? 'error' : ''}
                    {...register('emailEmpresa')}
                  />
                  {errors.emailEmpresa && <span className="error-text">{errors.emailEmpresa.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="telefonoEmpresa">Teléfono Empresa *</label>
                  <input
                    id="telefonoEmpresa"
                    type="tel"
                    className={errors.telefonoEmpresa ? 'error' : ''}
                    {...register('telefonoEmpresa')}
                  />
                  {errors.telefonoEmpresa && <span className="error-text">{errors.telefonoEmpresa.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="web">Web <span className="optional">(opcional)</span></label>
                  <input
                    id="web"
                    type="url"
                    placeholder="https://"
                    className={errors.web ? 'error' : ''}
                    {...register('web')}
                  />
                  {errors.web && <span className="error-text">{errors.web.message}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section__title">Ubicación</h2>
              <div className="form-grid form-grid--3">
                <div className="form-field">
                  <label htmlFor="region">Región *</label>
                  <select
                    id="region"
                    className={errors.region ? 'error' : ''}
                    {...register('region')}
                  >
                    <option value="">Seleccionar región</option>
                    {regiones.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.region && <span className="error-text">{errors.region.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="ciudad">Ciudad *</label>
                  <input
                    id="ciudad"
                    type="text"
                    className={errors.ciudad ? 'error' : ''}
                    {...register('ciudad')}
                  />
                  {errors.ciudad && <span className="error-text">{errors.ciudad.message}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="comuna">Comuna *</label>
                  <input
                    id="comuna"
                    type="text"
                    className={errors.comuna ? 'error' : ''}
                    {...register('comuna')}
                  />
                  {errors.comuna && <span className="error-text">{errors.comuna.message}</span>}
                </div>

                <div className="form-field form-field--full">
                  <label htmlFor="direccion">Dirección *</label>
                  <input
                    id="direccion"
                    type="text"
                    className={errors.direccion ? 'error' : ''}
                    {...register('direccion')}
                  />
                  {errors.direccion && <span className="error-text">{errors.direccion.message}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section__title">Comentarios</h2>
              <div className="form-field">
                <label htmlFor="comentarios">Comentarios <span className="optional">(opcional)</span></label>
                <textarea
                  id="comentarios"
                  placeholder="Cuéntanos sobre tu negocio o necesidades específicas..."
                  className={errors.comentarios ? 'error' : ''}
                  {...register('comentarios')}
                />
                {errors.comentarios && <span className="error-text">{errors.comentarios.message}</span>}
              </div>
            </div>

            <div className="form-submit">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
