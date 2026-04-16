const { body, validationResult } = require('express-validator');

// Common validation rules for posts
const postValidationRules = () => {
  return [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be 3-200 characters'),
    body('content')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Content must be at least 10 characters'),
    body('author').trim().notEmpty().withMessage('Author name is required'),
    body('category')
      .optional()
      .isIn(['Technology', 'Lifestyle', 'Travel', 'Food', 'Business', 'Other'])
  ];
};

const commentValidationRules = () => {
  return [
    body('author').trim().notEmpty().withMessage('Author name is required'),
    body('content').trim().isLength({ min: 1 }).withMessage('Comment cannot be empty')
  ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map((err) => err.msg)
        .join(', ')
    );
  }
  next();
};

module.exports = {
  postValidationRules,
  commentValidationRules,
  validate
};
