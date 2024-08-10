'use server';

import { connectToDatabase } from '../database/connect';
import { Listing } from '../database/listingSchema';
import { verify } from 'jsonwebtoken';

export const fetchListings = async function (token: string) {
  const token_key = process.env.TOKEN_KEY!;
  try {
    const decoded = verify(token, token_key) as { username: string };
    await connectToDatabase();
    const listings = await Listing.find({ user: decoded.username });
    return JSON.stringify({ listings, successfull: true });
  } catch (error) {
    console.log('Error', error);
    return JSON.stringify({ message: 'Invalid token', successfull: false });
  }
};
