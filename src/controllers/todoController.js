import createHttpError from 'http-errors';
import { createTask, deleteTask, getAllTasks, getTaskById, upserdTask } from '../services/todo.js';

// GET 
export const getToDoController = async (req, res) => {
        const tasks = await getAllTasks({ owner: req.user._id });
        res.json({
                status: 200,
                message: 'Successfully found tasks!',
                data: tasks,
        });
};

export const getToDoByIdController = async (req, res) => {
        const { taskId } = req.params;
        const task = await getTaskById(taskId);

        if (!task || (task.owner.toString() !== req.user._id.toString())) {
                throw createHttpError(404, 'Task not found or access denied');
        }

        res.json({
                status: 200,
                message: `Successfully found task with id ${taskId}!`,
                data: task,
        });
};

// POST 
export const createToDoController = async (req, res) => {
        // Перевірка на наявність користувача
        try {

        if (!req.user || !req.user._id && !req.user.id) {
                return res.status(401).json({
                        status: 401,
                        message: 'User not authenticated or invalid token',
                });
        }

        const ownerId = req.user._id || req.user.id;
        console.log(ownerId);

        // Додаємо власника до даних задачі
        const taskData = {
                ...req.body,
                owner: ownerId,
        };

                const task = await createTask(taskData);

                res.status(201).json({
                        status: 201,
                        message: 'Successfully created a task!',
                        data: task,
                });
        } catch (error) {
                res.status(500).json({
                        status: 500,
                        message: 'Error creating task',
                        error: error.message,
                });
        }
};

// DELETE
export const deleteToDoController = async (req, res, next) => {
        const { taskId } = req.params;
        const task = await deleteTask(taskId);

        if (!task || (task.owner.toString() !== req.user._id.toString())) {
                throw createHttpError(404, 'Task not found or access denied');
        }

        res.status(204).send();
};

// PUT 
export const updateToDoController = async (req, res, next) => {
        const { taskId } = req.params;
        const result = await upserdTask(taskId, { ...req.body, owner: req.user._id }, { upsert: true });

        if (!result) {
                throw createHttpError(404, 'Task not found');
        }

        const status = result.isNew ? 201 : 200;

        res.status(status).json({
                status,
                message: 'Successfully upserted a task!',
                data: result.tasks,
        });
};

// PATCH 
export const patchToDoController = async (req, res, next) => {
        const { taskId } = req.params;
        const result = await upserdTask(taskId, req.body);

        if (!result || (result.tasks.owner.toString() !== req.user._id.toString())) {
                throw createHttpError(404, 'Task not found or access denied');
        }

        res.json({
                status: 200,
                message: 'Successfully patched the task!',
                data: result.tasks,
        });
};
