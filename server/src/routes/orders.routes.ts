
import { Router, type Request, type Response } from "express";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

const router = Router();

interface CreateOrderBody {
  productId: string;
  customer: {
    name: string;
    phone: string;
    city: string;
    postOffice: string;
  };
}

router.post("/", async (req: Request<{}, {}, CreateOrderBody>, res: Response) => {
  try {
    const { productId, customer } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Товар не знайдено" });
      return;
    }

    const requiredFields = ["name", "phone", "city", "postOffice"] as const;
    const missing = requiredFields.filter((field) => !customer?.[field]);

    if (missing.length > 0) {
      res.status(400).json({ message: `Не заповнені поля: ${missing.join(", ")}` });
      return;
    }

    const order = await Order.create({
      product: product._id,
      productSnapshot: {
        model: product.model,
        price: product.price,
      },
      customer,
    });

    res.status(201).json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Помилка створення замовлення", error: message });
  }
});

export default router;