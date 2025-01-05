import { body, validationResult } from "express-validator";

// validation middleware for signUp

export const validateSignUp = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("role").notEmpty().withMessage("Role is required"),

  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password didn't match");
    }
    return true;
  }),

  // Handle any valdiation error
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next(); // Proceed to the next middleware/route handler
  },
];
