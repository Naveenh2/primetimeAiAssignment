const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validateMiddleware');
const { authenticate } = require('../middleware/authMiddleware');
const {
  createTaskSchema,
  updateTaskSchema,
  getTaskByIdSchema,
  listTaskSchema
} = require('../validators/taskValidator');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.use(authenticate);
router.get('/', validate(listTaskSchema), asyncHandler(taskController.listTasks));
router.post('/', validate(createTaskSchema), asyncHandler(taskController.createTask));
router.get('/:id', validate(getTaskByIdSchema), asyncHandler(taskController.getTaskById));
router.patch('/:id', validate(updateTaskSchema), asyncHandler(taskController.updateTask));
router.delete('/:id', validate(getTaskByIdSchema), asyncHandler(taskController.deleteTask));

module.exports = router;
