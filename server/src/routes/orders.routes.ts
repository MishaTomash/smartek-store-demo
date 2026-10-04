import { Router, type Request, type Response } from "express";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { orderLimiter } from "../middlewares/rateLimit.js";
import { createOrderSchema } from "../validation/order.schema.js";

const router = Router();

router.post("/", orderLimiter, async (req: Request, res: Response) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Перевірте дані замовлення",
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  const { productId, customer } = parsed.data;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Товар не знайдено" });
      return;
    }

    // Копія моделі й ціни на момент покупки: історія замовлень не зміниться,
    // якщо товар потім відредагують в адмінці
    const order = await Order.create({
      product: product._id,
      productSnapshot: { model: product.model, price: product.price },
      customer,
    });

    // Клієнту — лише номер і статус, без внутрішніх полів документа
    res.status(201).json({ id: order._id, status: order.status });
  } catch (error) {
    console.error("[orders] Помилка створення замовлення:", error);
    res.status(500).json({ message: "Помилка створення замовлення" });
  }
});

export default router;
