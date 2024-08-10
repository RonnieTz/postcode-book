'use server';
import { connectToDatabase } from '../database/connect';
import { User } from '../../utilities/database/UserSchema';
import { hashSync } from 'bcrypt';
export const register = async function (
  initialState: {
    message: string;
    successFull: boolean;
  } | null,
  formData: FormData
) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  console.log(Boolean(username), Boolean(password), Boolean(confirmPassword));

  try {
    await connectToDatabase();
    const user = await User.findOne({ username });
    if (!username || !password || !confirmPassword) {
      return { message: 'Please fill in all fields', successFull: false };
    }
    if (user) {
      return { message: 'User already exists', successFull: false };
    }
    if (password !== confirmPassword) {
      return { message: 'Passwords do not match', successFull: false };
    }
    if (password.length < 8) {
      return {
        message: 'Password must be at least 8 characters long',
        successFull: false,
      };
    }

    const encryptedPassword = hashSync(password, 10);
    const newUser = new User({ username, password: encryptedPassword });
    await newUser.save();

    return { message: 'Registered account successfully', successFull: true };
  } catch (err) {
    return {
      message: 'Registration failed. Contact web admin.',
      successFull: false,
    };
  }
};
