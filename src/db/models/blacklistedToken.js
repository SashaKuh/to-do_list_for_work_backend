// db/models/blacklistedToken.js

import { model, Schema } from 'mongoose';

const blacklistedTokenSchema = new Schema({
    token: { 
        type: String, 
        required: true,
        unique: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 86400 // Автоматично видаляємо після 24 годин
    }
});

export const BlacklistedTokenCollection = model('blacklistedToken', blacklistedTokenSchema);