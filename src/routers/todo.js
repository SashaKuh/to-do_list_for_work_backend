import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createToDoController, deleteToDoController, getToDoByIdController, getToDoController, patchToDoController, updateToDoController } from "../controllers/todoController.js";
import { validateBody } from "../middleware/validateBody.js";
import { isValidId } from "../middleware/isValidId.js";
import { createTaskSchema, updateTaskSchema } from "../validation/todos.js";
import { authenticateToken } from "../middleware/authenticateUser.js";

const todoRoute = Router();

todoRoute.get('/todolists',
        authenticateToken,
        ctrlWrapper(getToDoController));
todoRoute.get('/todolists/:taskId',
        authenticateToken,
        isValidId,
        ctrlWrapper(getToDoByIdController));

todoRoute.post('/todolists',
        authenticateToken,
        validateBody(createTaskSchema),
        ctrlWrapper(createToDoController),
);

todoRoute.delete('/todolists/:taskId',
        authenticateToken,
        isValidId,
        ctrlWrapper(deleteToDoController));

todoRoute.put('/todolists/:taskId',
        authenticateToken,
        isValidId,
        validateBody(updateTaskSchema),
        ctrlWrapper(updateToDoController),
);

todoRoute.patch('/todolists/:taskId',
        authenticateToken,
        isValidId,
        validateBody(updateTaskSchema),
        ctrlWrapper(patchToDoController),
);

export default todoRoute;