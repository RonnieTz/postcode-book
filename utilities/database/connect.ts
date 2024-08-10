import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  const mongo_uri = process.env.MONGO_DB;
  try {
    await connect(mongo_uri!);
  } catch (err) {
    console.log(err);
  }
};
