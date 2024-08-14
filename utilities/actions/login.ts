'use server';
import { connectToDatabase } from '../database/connect';
import { User } from '../../utilities/database/UserSchema';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
export const login = async function (
  _initialState: {
    message: string;
    successFull: boolean;
    token: string | null;
  } | null,
  formData: FormData
) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const tokenKey = process.env.TOKEN_KEY as string;
  if (!username) {
    return {
      message: 'Please enter a username',
      successFull: false,
      token: null,
    };
  }
  if (!password) {
    return {
      message: 'Please enter a password',
      successFull: false,
      token: null,
    };
  }

  try {
    await connectToDatabase();
    const user = await User.findOne({ username });
    if (!user) {
      return { message: 'User not found', successFull: false, token: null };
    }
    if (!compareSync(password, user.password)) {
      return { message: 'Incorrect password', successFull: false, token: null };
    }

    const token = sign({ username }, tokenKey, {
      expiresIn: '12h',
    });

    return { message: 'Login successful', successFull: true, token };
  } catch (err) {
    return { message: 'Login failed', successFull: false, token: null };
  }
};
