import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI не заданий у .env файлі");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB підключено успішно");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Помилка підключення до MongoDB:", message);
    process.exit(1);
  }
};