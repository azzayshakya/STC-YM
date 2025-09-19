import { body, validationResult } from "express-validator";

const validateLogin = [
  body("email").isEmail().withMessage("Invalid Email Format"),
  body("password")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be 3 characters long atleast"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

export default validateLogin;
