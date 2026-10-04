import { Router, type Request, type Response } from "express";
import { isValidObjectId } from "mongoose";
import { Product, GENERATIONS, type Generation } from "../models/Product.js";

const router = Router();

/**
 * Приймаємо лише рядок зі списку GENERATIONS. Без цієї перевірки
 * ?generation[$ne]=x перетворювався на оператор MongoDB у фільтрі.
 */
const parseGeneration = (value: unknown): Generation | null =>
  typeof value === "string" && (GENERATIONS as string[]).includes(value)
    ? (value as Generation)
    : null;

router.get("/", async (req: Request, res: Response) => {
  try {
    const generation = parseGeneration(req.query.generation);
    const filter = generation ? { generation } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("[products] Помилка отримання товарів:", error);
    res.status(500).json({ message: "Помилка отримання товарів" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404).json({ message: "Товар не знайдено" });
    return;
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Товар не знайдено" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("[products] Помилка отримання товару:", error);
    res.status(500).json({ message: "Помилка отримання товару" });
  }
});

export default router;
