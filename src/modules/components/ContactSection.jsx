"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "El asunto es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function ContactSection() {
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const formData = new FormData();
    formData.append("access_key", "dadc16e3-9f80-4843-9024-60d1cbbc87fd");
    formData.append("subject", `${data.subject} | PerfumesVIP`);
    formData.append("redirect", "false");
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: "success",
          message:
            result.message ||
            "¡Mensaje enviado! Te contactaremos a la brevedad.",
        });
        reset();
      } else {
        setStatus({
          type: "error",
          message: result.message || "Error al enviar. Intenta de nuevo.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Error al enviar. Intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-section__layout">
        <div className="contact-section__info">
          <span className="contact-section__eyebrow">Contáctanos</span>
          <h1 className="contact-section__title">¿En qué podemos ayudarte?</h1>
          <p className="contact-section__subtitle">
            Escríbenos y nuestro equipo se pondrá en contacto contigo lo antes
            posible.
          </p>

          <div className="contact-section__channels">
            <a href="tel:+56225495300" className="contact-section__channel">
              <PhoneOutlinedIcon fontSize="small" />
              <span>+56 2 2549 5300</span>
            </a>
            <a
              href="mailto:contact@perfumesvip.cl.cl"
              className="contact-section__channel"
            >
              <EmailOutlinedIcon fontSize="small" />
              <span>contact@perfumesvip.cl.cl</span>
            </a>
          </div>
        </div>

        <div className="form-card contact-section__card">
          {status.type === "success" && (
            <div className="contact-section__success" role="alert">
              {status.message}
            </div>
          )}

          {status.type === "error" && (
            <div className="contact-section__error" role="alert">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-field">
              <label htmlFor="contact-name">Nombre *</label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre completo"
                className={errors.name ? "error" : ""}
                {...register("name")}
              />
              {errors.name && (
                <span className="error-text">{errors.name.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email *</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className={errors.email ? "error" : ""}
                {...register("email")}
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Asunto *</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="¿En qué podemos ayudarte?"
                className={errors.subject ? "error" : ""}
                {...register("subject")}
              />
              {errors.subject && (
                <span className="error-text">{errors.subject.message}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Mensaje *</label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Cuéntanos los detalles..."
                className={errors.message ? "error" : ""}
                {...register("message")}
              />
              {errors.message && (
                <span className="error-text">{errors.message.message}</span>
              )}
            </div>

            <div className="form-submit">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
