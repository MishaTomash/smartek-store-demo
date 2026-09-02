
import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import { buildAdminRouter } from "./admin/setup.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));

  const { adminRouter, admin } = await buildAdminRouter();
  app.use(admin.options.rootPath, adminRouter);

  app.use("/api/products", productsRouter);
  app.use("/api/orders", ordersRouter);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
};