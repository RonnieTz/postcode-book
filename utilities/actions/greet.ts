'use server';

import { verify } from 'jsonwebtoken';

export const greet = async (token: string) => {
  const token_key = process.env.TOKEN_KEY!;

  try {
    const decoded = verify(token, token_key) as { username: string };

    return {
      message: `Hello ${decoded.username}`,
      successfull: true,
      username: decoded.username,
    };
  } catch (error) {
    console.log('Error', error);
    return { message: 'Invalid token', successfull: false };
  }
};
