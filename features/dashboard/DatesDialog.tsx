'use client';

import { SetListings } from '@/utilities/types';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import AddDate from './AddDate';
import { useState } from 'react';

type Props = {
  datesVisited: string[];
  setListings: SetListings;
  id: string;
};

const DatesDialog = ({ datesVisited, setListings, id }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Show dates</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography textAlign={'center'} variant="body1">
            DATES
          </Typography>
        </DialogTitle>
        <Divider variant="fullWidth" />
        {datesVisited.map((date) => (
          <Box key={date}>
            <Typography margin={2} key={date} variant="body1">
              {date}
            </Typography>
            <Divider />
          </Box>
        ))}
        <AddDate setListings={setListings} id={id} />
      </Dialog>
    </Box>
  );
};

export default DatesDialog;
