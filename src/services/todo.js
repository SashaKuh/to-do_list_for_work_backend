import { ToDoListCollection } from '../db/models/todo.js';

export const getAllTasks = async (query = {}) => {
        const tasks = await ToDoListCollection.find(query);
        return tasks
}

export const getTaskById = async (taskId) => {
        const task = await ToDoListCollection.findById(taskId);
        return task;
};

export const createTask = async (payload) => {
        const task = await ToDoListCollection.create(payload);
        return task;
};


export const deleteTask = async (taskId) => {
        const task = await ToDoListCollection.findByIdAndDelete({
                _id: taskId,
        });
        return task;
};

export const upserdTask = async (taskId, payload, options = {}) => {
        try {
                const rawResult = await ToDoListCollection.findOneAndUpdate(
                        { _id: taskId },
                        { $set: payload },
                        {
                                new: true,
                                upsert: options.upsert || false,
                                ...options,
                        }
                );

                if (!rawResult) {
                        return null;
                }

                return {
                        tasks: rawResult,
                        isNew: Boolean(rawResult._id),
                };
        } catch (error) {
                console.error('Error during task upsert:', error);
                throw error;
        }
};
