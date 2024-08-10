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
    const listing = await Listing.findOne({ _id });
    const today = new Date().toDateString();
    if (!listing) {
      return { successfull: false, message: 'Listing not found' };
    }
    if (listing.datesVisited.includes(today)) {
      return { successfull: false, message: 'Already added' };
    }
    console.log(listing.datesVisited);

    await Listing.updateOne({ _id }, { $push: { datesVisited: today } });
    return { successfull: true, message: 'Date added' };
  } catch (error) {
    return { successfull: false, message: 'Something went wrong' };
  }
};
