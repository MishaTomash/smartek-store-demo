import { z } from "zod";
import { isValidObjectId } from "mongoose";

/** Український номер у будь-якому записі -> +380XXXXXXXXX, інакше null */
const normalizeUaPhone = (value: string): string | null => {
  const digits = value.replace(/\D/g, "");
  if (/^380\d{9}$/.test(digits)) return `+${digits}`;
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`;
  return null;
};

const text = (label: string, max: number) =>
  z
    .string({ error: `Вкажіть поле «${label}»` })
    .trim()
    .min(2, `Поле «${label}» занадто коротке`)
    .max(max, `Поле «${label}» занадто довге`);

export const createOrderSchema = z.object({
  productId: z
    .string({ error: "Некоректний ідентифікатор товару" })
    .refine(isValidObjectId, "Некоректний ідентифікатор товару"),
  customer: z.object({
    name: text("Ім'я", 100),
    phone: z
      .string({ error: "Вкажіть номер телефону" })
      .transform((value, ctx) => {
        const phone = normalizeUaPhone(value);
        if (!phone) {
          ctx.addIssue({
            code: "custom",
            message: "Некоректний номер телефону",
          });
          return z.NEVER;
        }
        return phone;
      }),
    city: text("Місто", 100),
    postOffice: text("Відділення", 200),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
