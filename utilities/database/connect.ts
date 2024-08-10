import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await connect('mongodb://localhost:27017/postcodes');
    console.log('Connected to database');
  } catch (err) {
    console.log(err);
  }
};
