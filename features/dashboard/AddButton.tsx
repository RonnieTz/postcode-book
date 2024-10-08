'use client';

import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { addListing } from '@/utilities/actions/addListing';
import { useEffect, useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { fetchListings } from '@/utilities/actions/fetchListings';
import { SetListings } from '@/utilities/types';

type Props = {
  setListings: SetListings;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AddButton = ({
  setListings,
  setSnackbarMessage,
  setSnackbarOpen,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState('');
  const [_postCode, setPostCode] = useState('');
  const [_siteManager, setSiteManager] = useState('');
  const [_company, setCompany] = useState('');
  const [state, action] = useFormState(addListing, null);
  const token = useRef('');

  useEffect(() => {
    token.current =
      localStorage.getItem('token')! || sessionStorage.getItem('token')!;
    if (!token.current) {
      window.location.href = '/login';
    }
    if (state?.successfull) {
      setOpen(false);
    }

    const fetchData = async () => {
      const data = await fetchListings(token.current);
      const listings = await JSON.parse(data).listings;

      setListings(listings);
      if (site) {
        setSnackbarMessage(`Successfully added "${site}"`);
        setSnackbarOpen(true);
      }
    };
    fetchData();
  }, [state]);

  return (
    <>
      {!open && (
        <Button
          onClick={() => {
            setOpen(true);
          }}
          sx={{ margin: ' 0 5px 0 1px' }}
          variant="contained"
        >
          new
        </Button>
      )}
      <Dialog fullWidth onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Add new listing</DialogTitle>
        <form action={action} style={{ margin: '40px' }}>
          <TextField
            onChange={(e) => setSite(e.target.value)}
            fullWidth
            label={'Site'}
            name="site"
          />
          <TextField
            onChange={(e) => setPostCode(e.target.value)}
            margin="normal"
            name="postCode"
            fullWidth
            label={'Postcode'}
          />
          <TextField
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
            label={'Company'}
            name="company"
            margin="normal"
          />
          <TextField
            onChange={(e) => setSiteManager(e.target.value)}
            fullWidth
            label={'Site Manager'}
            name="siteManager"
            margin="normal"
          />
          <input type="hidden" name={'token'} value={token.current} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
          <Typography marginTop={3} color={'red'}>
            {!state?.successfull && state?.message}
          </Typography>
        </form>
      </Dialog>
    </>
  );
};

export default AddButton;
