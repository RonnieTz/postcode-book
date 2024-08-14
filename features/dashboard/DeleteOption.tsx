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
import { Listing, SetListings } from '@/utilities/types';

type Props = {
  site: string;
  id: string;
  setListings: SetListings;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
};

const DeleteOption = ({
  site,
  id,
  setListings,
  setSnackbarMessage,
  setSnackbarOpen,
}: Props) => {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const remove = async (site: string) => {
    setOpen(false);
    const token =
      localStorage.getItem('token')! || sessionStorage.getItem('token')!;
    const res = await deleteListing(id, token);
    if (res.successfull) {
      const data = await fetchListings(token);
      setListings(await JSON.parse(data).listings);
      setSnackbarMessage(`Successfully deleted "${site}"`);
      setSnackbarOpen(true);
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

        <Button sx={{ margin: 2 }} onClick={() => remove(site)}>
          <DeleteForeverIcon color="error" fontSize="large" />
        </Button>
        <Divider />
        <Button onClick={close}>Cancel</Button>
      </Dialog>
    </Box>
  );
};

export default DeleteOption;
