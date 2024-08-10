import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await connect('mongodb://localhost:27017/postcodes');
  } catch (err) {
    console.log(err);
  }
};
