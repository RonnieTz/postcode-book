'use server';
import { connectToDatabase } from '../database/connect';
import { Listing } from '../database/listingSchema';
import { verify } from 'jsonwebtoken';

export const deleteListing = async (id: string, token: string) => {
  if (!id) {
    return { message: 'No id provided', successfull: false };
  }
  if (!token) {
    return { message: 'No token provided', successfull: false };
  }
  const decoded = verify(token, process.env.TOKEN_KEY!);
  if (!decoded) {
    return { message: 'Invalid token', successfull: false };
  }
  try {
    await connectToDatabase();
    await Listing.findByIdAndDelete(id);
    return { message: 'Listing deleted', successfull: true };
  } catch (error) {
    return { message: 'Something went wrong', successfull: false };
  }
};
