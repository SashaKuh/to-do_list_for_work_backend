import Joi from 'joi';

export const createTaskSchema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(200).optional(),
        difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
        status: Joi.string().valid('in-progress', 'done').required(),
});

export const updateTaskSchema = Joi.object({
        title: Joi.string().min(3).max(50).optional(),
        description: Joi.string().max(200).optional(),
        difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').optional(),
        status: Joi.string().valid('in-progress', 'done').optional(),
});
