'use client';

import { Box, Dialog, DialogTitle, TextField, Typography } from '@mui/material';
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
      <Dialog open={open} onClose={save}>
        <DialogTitle>
          <Typography variant="h5">Site Manager</Typography>
        </DialogTitle>
        <TextField
          autoFocus
          onChange={(e) => {
            setNewSiteManager(e.target.value);
          }}
          size="medium"
          value={newSiteManager}
        />
      </Dialog>
    </Box>
  );
};

export default SiteManagerDialog;
