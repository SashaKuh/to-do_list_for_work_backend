import { model, Schema } from 'mongoose';

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  status: { type: String, enum: ['in-progress', 'done'], default: 'in-progress' },
  owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true, versionKey: false });

export const ToDoListCollection = model('todo', todoSchema, 'todo');


