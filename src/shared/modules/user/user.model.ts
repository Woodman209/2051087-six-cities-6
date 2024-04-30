import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: [3, 'Min length for name is 3']
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  },
  avatar: String,
  password: String,
  userType: String,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
