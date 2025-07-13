import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 50, // Limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

