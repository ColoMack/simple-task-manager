const express = require('express');
const authenticateToken = require('../middleware/authenticateToken')
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
    '/',
    authenticateToken,
    [
        check('title').notEmpty().withMessage('Title is required'),
        check('priority')
            .isIn(['Low', 'Medium', 'High'])
            .withMessage('Priority must be Low, Medium or High'),
        check('dueDate')
            .optional()
            .isISO8601()
            .withMessage('Invalid date format...(must be ISO8601)'),
    ],

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createTask
);

router.put(
    '/:id',
    authenticateToken,
    [
      check('title').optional().notEmpty().withMessage('Title cannot be empty'),
      check('priority')
        .optional()
        .isIn(['Low', 'Medium', 'High'])
        .withMessage('Priority must be Low, Medium, or High'),
      check('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format (must be ISO8601)'),
      check('status')
        .optional()
        .isIn(['To Do', 'In Progress', 'Completed'])
        .withMessage('Status must be To Do, In Progress, or Completed'),
    ],
    
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    updateTask
);

router.get('/', authenticateToken, getTasks);

router.get('/:id', authenticateToken, getTaskById);

router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;