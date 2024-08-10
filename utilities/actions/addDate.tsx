'use server';

import { connectToDatabase } from '../database/connect';
import { Listing } from '../database/listingSchema';
import { verify } from 'jsonwebtoken';

export const addDate = async (
  initialState: { message: string; successfull: boolean } | null,
  formData: FormData
) => {
  const _id = formData.get('_id') as string;
  const token = formData.get('token') as string;
  const decoded = verify(token, process.env.TOKEN_KEY!);

  if (!decoded) {
    return { successfull: false, message: 'Invalid token' };
  }
  if (!_id) {
    return { successfull: false, message: 'Listing ID is required' };
  }

  try {
    await connectToDatabase();
    await Listing.updateOne(
      { _id },
      { $push: { datesVisited: new Date().toLocaleDateString() } }
    );
    return { successfull: true, message: 'Date added' };
  } catch (error) {
    return { successfull: false, message: 'Something went wrong' };
  }
};
