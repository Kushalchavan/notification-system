import rateLimit from "express-rate-limit";

export const notificationRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return info `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
