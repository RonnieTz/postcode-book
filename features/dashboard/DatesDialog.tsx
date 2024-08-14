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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDate from './AddDate';
import { useState } from 'react';
import { set } from 'mongoose';

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
          <Typography margin={2} key={date} variant="body1">
            {date}
          </Typography>
        ))}
        <AddDate setListings={setListings} id={id} />
      </Dialog>
    </Box>
  );
};

export default DatesDialog;
