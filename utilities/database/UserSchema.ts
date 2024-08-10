import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({ username: String, password: String });

export const User = models.User || model('User', UserSchema);
