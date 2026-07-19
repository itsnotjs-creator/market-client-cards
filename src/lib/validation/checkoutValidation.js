import { z } from "zod";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const checkoutSchema = z
  .object({
    fullName: z.string().min(1, "El nombre completo es requerido"),
    rut: z.string().min(1, "El RUT es requerido"),
    email: z.string().min(1, "El correo electrónico es requerido").email("El correo electrónico es inválido"),
    phone: z.string().min(1, "El teléfono es requerido"),
    address: z.string().min(1, "La dirección es requerida"),
    comuna: z.string().min(1, "La comuna es requerida"),
    region: z.string().min(1, "La región es requerida"),
    courier: z.string().min(1, "Selecciona un courier"),
    createAccount: z.boolean().default(false),
    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.createAccount && !passwordPattern.test(data.password || "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
        path: ["password"],
      });
    }
  });
