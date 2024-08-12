import { Dispatch, SetStateAction } from 'react';

export type SetListings = Dispatch<
  SetStateAction<
    {
      _id: string;
      site: string;
      postCode: string;
      company: string;
      siteManager: string;
      datesVisited: string[];
    }[]
  >
>;

export type Listing = {
  _id: string;
  site: string;
  postCode: string;
  siteManager: string;
  company: string;
  datesVisited: string[];
};
