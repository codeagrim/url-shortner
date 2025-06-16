import { body, validationResult } from "express-validator";

const validateUrl = [
  body('originalUrl')
    .isURL()
    .withMessage('Invalid URL format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUrl };