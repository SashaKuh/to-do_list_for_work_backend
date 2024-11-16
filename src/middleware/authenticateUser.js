// middleware/authenticateUser.js

import jwt from 'jsonwebtoken';
import { BlacklistedTokenCollection } from "../db/models/blacklistedToken.js";

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
   
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Перевіряємо чи токен не в чорному списку
        const isBlacklisted = await BlacklistedTokenCollection.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token has been invalidated' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ message: 'Authentication error' });
    }
};