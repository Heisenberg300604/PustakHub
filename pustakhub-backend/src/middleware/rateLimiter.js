const rateLimit = require('express-rate-limit');

// General rate limiter (can be used globally)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Optional: Separate limiter for auth (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Lower limit for sensitive routes
  message: 'Too many login attempts. Please try again later.',
});

module.exports = {
  generalLimiter,
  authLimiter,
};
