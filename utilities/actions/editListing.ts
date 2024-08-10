'use server';

import { connectToDatabase } from '../database/connect';
import { Listing } from '../database/listingSchema';
import { verify } from 'jsonwebtoken';

export const editSiteManager = async (
  token: string,
  id: string,
  siteManager: string
) => {
  const decoded = verify(token, process.env.TOKEN_KEY!);
  if (!decoded) {
    return { message: 'Invalid token', successfull: false };
  }
  if (!id) {
    return { message: 'Listing ID is required', successfull: false };
  }
  if (!siteManager) {
    return { message: 'Site Manager is required', successfull: false };
  }

  try {
    await connectToDatabase();
    const listing = await Listing.findOne({ _id: id });
    if (!listing) {
      return { message: 'Listing not found', successfull: false };
    }
    await Listing.updateOne({ _id: id }, { siteManager });
    return { message: 'Site Manager updated', successfull: true };
  } catch (error) {
    return { message: 'Something went wrong', successfull: false };
  }
};
