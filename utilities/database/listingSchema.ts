import { Schema, model, models } from 'mongoose';

const ListingSchema = new Schema({
  site: String,
  postCode: String,
  siteManager: String,
  datesVisited: [String],
  user: String,
});

export const Listing = models?.Listing || model('Listing', ListingSchema);
