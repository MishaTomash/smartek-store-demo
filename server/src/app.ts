import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import { buildAdminRouter } from "./admin/setup.js";
import { adminLoginLimiter } from "./middlewares/rateLimit.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createApp = async (): Promise<Express> => {
  const app = express();

  // За nginx: справжня IP клієнта для rate limit і secure-cookie сесії адмінки
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "20kb" }));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "public", "uploads")),
  );

  const { adminRouter, admin } = await buildAdminRouter();
  // Ліміт лише на POST логіну; решта адмінки працює без обмежень
  app.post(`${admin.options.rootPath}/login`, adminLoginLimiter);
  app.use(admin.options.rootPath, adminRouter);

  app.use("/api/products", productsRouter);
  app.use("/api/orders", ordersRouter);

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return app;
};
