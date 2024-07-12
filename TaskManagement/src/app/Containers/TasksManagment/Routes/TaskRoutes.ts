import { Router } from 'express';
import { TaskController } from '../Controllers/TaskController';
import { TaskMiddleware } from '../Middlewares/TaskMiddleware';
import {validateSearchTasks, validateTask, validateTaskId, validateUpdateTask} from '../Middlewares/Validators';
import { ControllerHandler } from '../../../Ship/Handlers/ControllerHandler';

const router = Router();

// GET /tasks
router.get('/', TaskMiddleware, ControllerHandler(TaskController.getAllTasks));

// GET /tasks/search
router.get('/search', TaskMiddleware, validateSearchTasks, ControllerHandler(TaskController.searchTasks));

// PUT /tasks/mark-today
router.put('/mark-today', TaskMiddleware, ControllerHandler(TaskController.markTasksToday));

// GET /tasks/:id
router.get('/:id', TaskMiddleware, validateTaskId, ControllerHandler(TaskController.getTaskById));

// POST /tasks
router.post('/', TaskMiddleware, validateTask, ControllerHandler(TaskController.createTask));

// PUT /tasks/:id
router.put('/:id', TaskMiddleware, validateTaskId, validateUpdateTask, ControllerHandler(TaskController.updateTask));

// DELETE /tasks/:id
router.delete('/:id', TaskMiddleware, validateTaskId, ControllerHandler(TaskController.deleteTask));

export default router;
