import rateLimit from "express-rate-limit";

/**
 * Створення замовлень: не більше 5 з однієї IP за 15 хвилин.
 * Справжньому покупцю цього досить, а скрипт не завалить адмінку фейковими замовленнями.
 */
export const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Забагато замовлень. Спробуйте пізніше або напишіть менеджеру.",
  },
});

/**
 * Вхід в адмін-панель: не більше 10 спроб з однієї IP за 15 хвилин —
 * захист від підбору пароля перебором. Успішні входи не рахуються:
 * AdminJS при успіху робить редирект (302), а при невдачі знову віддає сторінку логіну (200).
 */
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  requestWasSuccessful: (_req, res) => res.statusCode === 302,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Забагато спроб входу. Спробуйте через 15 хвилин.",
});
