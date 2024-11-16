import jwt from 'jsonwebtoken'

import { registerUser, findUserByEmail, verifyPassword } from "../services/auth.js"
import { BlacklistedTokenCollection } from "../db/models/blacklistedToken.js";

export const registerUserController = async (req, res) => {
        try {
                const user = await registerUser(req.body);

                res.status(201).json({
                        status: 201,
                        message: 'Successfully registred a user!',
                        data: user,
                })
        } catch (err) {
                res.status(500).json({
                        message: 'Registration failed. Please try again.',
                        error: err.message
                })
        }
};

export const loginUserController = async (req, res, next) => {
        const { email, password } = req.body;

        try {
                const user = await findUserByEmail(email);

                if (!user || !(await verifyPassword(password, user.password))) {
                        return res.status(401).json({
                                message: "Invalid credentials"
                        });
                }

                const accessToken = jwt.sign(
                        { _id: user._id, name: user.name, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '1d' }
                );

                res.json({
                        accessToken,
                        user: { id: user._id, name: user.name, email: user.email },
                });
        } catch (err) {
                res.status(500).json({
                        message: "Login failed. Please try again.",
                        error: err.message
                });
        }
};

// controllers/authController.js

// controllers/authController.js


export const logoutUserController = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        
        // Додаємо токен до чорного списку
        await BlacklistedTokenCollection.create({ token });

        res.status(200).json({
            status: 200,
            message: 'Successfully logged out'
        });
    } catch (err) {
        res.status(500).json({
            message: "Logout failed. Please try again.",
            error: err.message
        });
    }
};