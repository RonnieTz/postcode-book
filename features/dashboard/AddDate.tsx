'use client';
import { addDate } from '@/utilities/actions/addDate';
import { Button } from '@mui/material';
import { useFormState } from 'react-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { fetchListings } from '@/utilities/actions/fetchListings';
import { Listing } from '@/utilities/types';

const AddDate = ({
  id,
  setListings,
}: {
  id: string;
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}) => {
  const [state, action] = useFormState(addDate, null);
  const token =
    localStorage.getItem('token')! || sessionStorage.getItem('token')!;
  useEffect(() => {
    if (state?.successfull) {
      const fetchData = async () => {
        const data = await fetchListings(token);
        setListings(await JSON.parse(data).listings);
      };
      fetchData();
    }
  }, [state]);
  return (
    <form action={action}>
      <input type="hidden" value={id} name="_id" />
      <input type="hidden" value={token!} name="token" />
      <Button type="submit">
        <AddIcon />
      </Button>
    </form>
  );
};

export default AddDate;
