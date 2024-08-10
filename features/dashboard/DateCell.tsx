import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
} from '@mui/material';
import React from 'react';
import AddDate from './AddDate';

type Props = {
  data: {
    _id: string;
    site: string;
    postCode: string;
    siteManager: string;
    datesVisited: string[];
  };
  setListings: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        site: string;
        postCode: string;
        siteManager: string;
        datesVisited: string[];
      }[]
    >
  >;
};

const DateCell = ({ data, setListings }: Props) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography width={'100%'}>View</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {data.datesVisited.map((date, index) => (
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}
            >
              {date}
            </ListItem>
          ))}
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AddDate setListings={setListings} id={data._id} />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default DateCell;
