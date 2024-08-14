'use server';

import { connectToDatabase } from '../database/connect';
import { Listing } from '../database/listingSchema';
import { verify } from 'jsonwebtoken';

export const addListing = async function (
  _initialState: { message: string; successfull: boolean } | null,
  formData: FormData
) {
  const token_key = process.env.TOKEN_KEY!;
  const token = formData.get('token') as string;
  const decoded = verify(token, token_key) as { username: string };
  const site = formData.get('site') as string;
  const postCode = formData.get('postCode') as string;
  const siteManager = formData.get('siteManager') as string;
  const company = formData.get('company') as string;
  console.log(company);

  if (!site) {
    return { message: 'Site is required', successfull: false };
  }
  if (!postCode) {
    return { message: 'Postcode is required', successfull: false };
  }
  if (!siteManager) {
    return { message: 'Site Manager is required', successfull: false };
  }
  if (!company) {
    return { message: 'Company is required', successfull: false };
  }
  if (!decoded) {
    return { message: 'Invalid token', successfull: false };
  }
  try {
    await connectToDatabase();
    const existingListing = await Listing.findOne({
      postCode,
      user: decoded.username,
    });
    if (existingListing) {
      return { message: 'Listing already exists', successfull: false };
    }
    const listing = new Listing({
      site,
      postCode,
      siteManager,
      company,
      user: decoded.username,
    });
    await listing.save();
    return { message: 'Listing added', successfull: true };
  } catch (error) {
    console.log('Error', error);
    return { message: 'Error adding listing', successfull: false };
  }
};
