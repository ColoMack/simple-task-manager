const express = require('express');
const { check, validationResult } = require('express-validator')
const { login, signup } = require('../controllers/authController');

const router = express.Router();

router.post(
    '/signup', 
    [
        check('email').isEmail().withMessage('Invalid email address'),
        check('password')
            .isLength({ min: 2 })
            .withMessage('Password must be atleast 2 characters long'),
    ], 
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    signup
);

router.post(
    '/login',
    [
      check('email').isEmail().withMessage('Invalid email address'),
      check('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    login
);

module.exports = router;