'use server';
import { connectToDatabase } from '../database/connect';
import { Listing } from '../database/listingSchema';
import { verify } from 'jsonwebtoken';

export const editCompany = async function (
  token: string,
  id: string,
  company: string
) {
  if (!id) {
    return { message: 'No id provided', successfull: false };
  }
  if (!company) {
    return { message: 'No company provided', successfull: false };
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
    await Listing.updateOne({ _id: id }, { company });
    return { message: 'Company updated', successfull: true };
  } catch (error) {
    return { message: 'Something went wrong', successfull: false };
  }
};
