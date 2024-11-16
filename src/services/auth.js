import bcrypt from 'bcrypt';

import { UsersCollection } from "../db/models/auth.js"
import createHttpError from 'http-errors';

export const registerUser = async payload => {

        const existingUser = await findUserByEmail(payload.email);
        if (existingUser) {
                throw createHttpError(409, "Email already in use");
        }

        const user = await UsersCollection.create(payload);

        return {
                id: user._id,
                name: user.name,
                email: user.email
        };
};

export const findUserByEmail = async email => {
        return await UsersCollection.findOne({ email });
};

export const verifyPassword = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
}
