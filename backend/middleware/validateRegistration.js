import { body, validationResult } from "express-validator";

const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .isLength({ min: 6, max: 50 })
    .withMessage("Email must be between 6 and 50 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 and 30 characters"),

  body("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["teacher", "student"])
    .withMessage("User type must be either 'teacher' or 'student'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }
    next();
  },
];

export default validateRegistration;
