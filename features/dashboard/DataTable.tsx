'use client';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddDate from './AddDate';
import AddButton from './AddButton';
import { fetchListings } from '@/utilities/actions/fetchListings';
import SiteManagerDialog from './SiteManagerDialog';
import DateCell from './DateCell';
import DeleteOption from './DeleteOption';
import { Listing } from '@/utilities/types';

const DataTable = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => {
    const token =
      localStorage.getItem('token')! || sessionStorage.getItem('token')!;
    const fetchData = async () => {
      const data = await fetchListings(token);
      setListings(await JSON.parse(data).listings);
    };
    fetchData();
  }, []);
  return (
    <Box marginTop={5} maxWidth={'100vw'}>
      <Table sx={{ maxWidth: '100vw' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">SITE NAME</TableCell>
            <TableCell align="center">POSTCODE</TableCell>
            <TableCell align="center">COMPANY</TableCell>
            <TableCell align="center">SITE MANAGER</TableCell>
            <TableCell align="center">DATES VISITED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((data, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <DeleteOption
                  site={data.site}
                  id={data._id}
                  setListings={setListings}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarMessage={setSnackbarMessage}
                />
              </TableCell>
              <TableCell align="center">{data.postCode}</TableCell>
              <TableCell align="center">{data.company}</TableCell>
              <TableCell align="center">
                <SiteManagerDialog
                  setListings={setListings}
                  id={data._id}
                  siteManager={data.siteManager}
                />
              </TableCell>
              <TableCell align="center">
                <DateCell data={data} setListings={setListings} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell padding="none" align="center" colSpan={5}>
              <AddButton
                setListings={setListings}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => {
            setSnackbarOpen(false);
            setTimeout(() => setSnackbarMessage(''), 3000);
          }}
        >
          <Alert severity="success">{snackbarMessage}</Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default DataTable;
