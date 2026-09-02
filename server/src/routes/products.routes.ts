import { Router, type Request, type Response } from "express";
import { Product, type Generation } from "../models/Product.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {

    const generation = req.query.generation as Generation | "Всі" | undefined;

    const filter = generation && generation !== "Всі" ? { generation } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Помилка отримання товарів", error: message });
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Товар не знайдено" });
      return;
    }

    res.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Помилка отримання товару", error: message });
  }
});

export default router;