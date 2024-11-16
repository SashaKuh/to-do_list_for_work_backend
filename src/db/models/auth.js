import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const usersShema = new Schema(
        {
                name: { type: String, required: true },
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
        },
        { timestamps: true, versionKey: false },
);

usersShema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
})

export const UsersCollection = model('users', usersShema);