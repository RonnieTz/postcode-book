import { Dispatch, SetStateAction } from 'react';

export type Listing = {
  _id: string;
  site: string;
  postCode: string;
  siteManager: string;
  company: string;
  datesVisited: string[];
};
export type SetListings = Dispatch<SetStateAction<Listing[]>>;
