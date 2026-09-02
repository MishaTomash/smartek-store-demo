import uploadFeature from "@adminjs/upload";
import path from "path";
import { fileURLToPath } from "url";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";

import { Product, GENERATIONS } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "..", "..", "public", "uploads");
AdminJS.registerAdapter(AdminJSMongoose);

interface AdminBundle {
  admin: AdminJS;
  adminRouter: ReturnType<typeof AdminJSExpress.buildAuthenticatedRouter>;
}

export const buildAdminRouter = async (): Promise<AdminBundle> => {
  const admin = new AdminJS({
    componentLoader,
    resources: [
      {
        resource: Product,
        options: {
          navigation: { name: "Каталог", icon: "Smartphone" },
          properties: {
            model: { position: 1 },
            generation: {
              position: 2,
              availableValues: GENERATIONS.map((g) => ({ value: g, label: g })),
            },
            price: { position: 3 },
            storage: { position: 4 },
            color: { position: 5 },
            condition: { position: 6 },
            batteryHealth: { position: 7 },
            availability: { position: 8 },
            createdAt: {
              isVisible: { list: true, edit: false, filter: true, show: true },
            },
          },
        },
        features: [
          uploadFeature({
            componentLoader,
            provider: {
              local: { bucket: uploadDir, opts: { baseUrl: "/uploads" } },
            },
            properties: { key: "images" },
            multiple: true,
            validation: {
              mimeTypes: ["image/png", "image/jpeg", "image/webp"],
            },
          }),
        ],
      },
      {
        resource: Order,
        options: {
          navigation: { name: "Продажі", icon: "ShoppingCart" },
          actions: {
            new: { isAccessible: false },
          },
          properties: {
            status: { position: 1 },
            "productSnapshot.model": { position: 2 },
            "productSnapshot.price": { position: 3 },
            "customer.name": { position: 4 },
            "customer.phone": { position: 5 },
            "customer.city": { position: 6 },
            "customer.postOffice": { position: 7 },
          },
        },
      },
    ],
    locale: {
      language: "ua",
      availableLanguages: ["ua"],
      localeDetection: false,
      translations: {
        ua: {
          labels: {
            Product: "Товар",
            Order: "Замовлення",
            loginWelcome: "Вхід в адмін-панель",
          },
          properties: {
            model: "Модель",
            generation: "Покоління",
            storage: "Пам'ять (ГБ)",
            color: "Колір",
            images: "Фото",
            warranty: "Гарантія",
            availability: "Наявність",
            condition: "Стан",
            batteryHealth: "Акумулятор (%)",
            price: "Ціна",
            createdAt: "Створено",
            updatedAt: "Оновлено",
            status: "Статус",
            "productSnapshot.model": "Модель товару",
            "productSnapshot.price": "Ціна на момент замовлення",
            "customer.name": "ПІБ клієнта",
            "customer.phone": "Телефон",
            "customer.city": "Місто",
            "customer.postOffice": "Відділення пошти",
          },
          actions: {
            new: "Додати",
            edit: "Редагувати",
            show: "Переглянути",
            delete: "Видалити",
            bulkDelete: "Видалити вибрані",
            list: "Список",
          },
          buttons: {
            save: "Зберегти",
            filter: "Фільтр",
            applyChanges: "Застосувати",
            resetFilter: "Скинути",
            confirmRemovalMany: "Видалити",
            logout: "Вийти",
            login: "Увійти",
          },
          messages: {
            successfullyCreated: "Успішно створено",
            successfullyUpdated: "Успішно оновлено",
            successfullyDeleted: "Успішно видалено",
            thereWereValidationErrors: "Є помилки валідації",
          },
        },
      },
    },
    branding: {
      companyName: "TechShop — Адмін-панель",
      withMadeWithLove: false,
    },
    rootPath: "/admin",
  });

  if (process.env.NODE_ENV === "production") {
    await admin.initialize();
  } else {
    await admin.watch();
  }

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email: string, password: string) => {
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { email };
        }
        return null;
      },
      cookiePassword: process.env.SESSION_SECRET as string,
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
    },
  );

  return { admin, adminRouter };
};
