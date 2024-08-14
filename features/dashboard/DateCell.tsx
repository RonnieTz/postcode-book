import { Box, Button } from '@mui/material';
import React from 'react';
import AddDate from './AddDate';
import { Listing, SetListings } from '@/utilities/types';

type Props = {
  data: Listing;
  setListings: SetListings;
  setDates: React.Dispatch<React.SetStateAction<string[]>>;
};

const DateCell = ({ data, setListings, setDates }: Props) => {
  return (
    <Box>
      <Button
        onClick={() => {
          setDates(data.datesVisited);
          if (!data.datesVisited.length) {
            setDates(['"No dates visited"']);
          }
        }}
        fullWidth
        variant="outlined"
      >
        SHOW DATES
      </Button>
    </Box>
  );
};

export default DateCell;
