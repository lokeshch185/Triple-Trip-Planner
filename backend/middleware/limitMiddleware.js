const rateLimit = require('express-rate-limit');

const waitlistLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
  message: 'Too many requests from this IP, please try again after 30 minutes.',
  keyGenerator: (req, res) => {
    const ip = req.headers['true-client-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
    return ip;
  },
});

module.exports = { waitlistLimiter };