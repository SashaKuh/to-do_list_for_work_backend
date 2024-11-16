import { Router } from "express";

import { validateBody } from "../middleware/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, registerUserController } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authenticateUser.js";

const authRoute = Router();

authRoute.post(
        '/register',
        validateBody(registerUserSchema),
        registerUserController
)

authRoute.post(
        '/login',
        validateBody(loginUserSchema),
        loginUserController
)

authRoute.post(
        '/logout',
        authenticateToken,
        logoutUserController
)


export default authRoute