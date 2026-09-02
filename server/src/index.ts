
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

const start = async (): Promise<void> => {
  await connectDB();

  const app = await createApp();
  const PORT = process.env.PORT ?? 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущено:      http://localhost:${PORT}`);
    console.log(`🛠  Адмін-панель:         http://localhost:${PORT}/admin`);
    console.log(`📦 API товарів:          http://localhost:${PORT}/api/products`);
  });
};

start();