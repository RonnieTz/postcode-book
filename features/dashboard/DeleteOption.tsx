'use client';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { deleteListing } from '@/utilities/actions/deleteListing';
import { fetchListings } from '@/utilities/actions/fetchListings';

type Props = {
  site: string;
  id: string;
  setListings: (
    value: React.SetStateAction<
      {
        _id: string;
        site: string;
        postCode: string;
        siteManager: string;
        datesVisited: string[];
      }[]
    >
  ) => void;
};

const DeleteOption = ({ site, id, setListings }: Props) => {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const remove = async () => {
    setOpen(false);
    const token =
      localStorage.getItem('token')! || sessionStorage.getItem('token')!;
    const res = await deleteListing(id, token);
    if (res.successfull) {
      const data = await fetchListings(token);
      setListings(await JSON.parse(data).listings);
    }
  };

  return (
    <Box>
      <span onClick={() => setOpen(true)}>{site}</span>
      <Dialog open={open} onClose={close}>
        <DialogTitle>
          <Typography variant="h5">{site}</Typography>
        </DialogTitle>
        <Divider />
        <Button onClick={remove}>
          <DeleteForeverIcon color="error" fontSize="large" />
        </Button>
        <Button onClick={close}>Cancel</Button>
      </Dialog>
    </Box>
  );
};

export default DeleteOption;
