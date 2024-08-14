'use client';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { editSiteManager } from '@/utilities/actions/editListing';
import { fetchListings } from '@/utilities/actions/fetchListings';
import { SetListings } from '@/utilities/types';
type Props = {
  siteManager: string;
  id: string;
  setListings: SetListings;
};

const SiteManagerDialog = ({ siteManager, id, setListings }: Props) => {
  const [open, setOpen] = useState(false);
  const [newSiteManager, setNewSiteManager] = useState(siteManager);
  const token =
    localStorage.getItem('token')! || sessionStorage.getItem('token')!;
  const save = async () => {
    const res = await editSiteManager(token, id, newSiteManager);
    if (res.successfull) {
      const data = await fetchListings(token);
      setListings(await JSON.parse(data).listings);
    }

    setOpen(false);
  };

  return (
    <Box>
      <span onClick={() => setOpen(true)}>{siteManager}</span>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewSiteManager(siteManager);
        }}
      >
        <DialogTitle>
          <Typography textAlign={'center'} variant="body1">
            Site Manager
          </Typography>
        </DialogTitle>
        <Divider variant="fullWidth" />
        <TextField
          autoFocus
          onChange={(e) => {
            setNewSiteManager(e.target.value);
          }}
          size="medium"
          value={newSiteManager}
          sx={{
            margin: 2,
            boxShadow: '0 0 5px 0 black',
            borderRadius: 1,
          }}
        />
        <Button onClick={save} variant="outlined">
          Save
        </Button>
      </Dialog>
    </Box>
  );
};

export default SiteManagerDialog;
