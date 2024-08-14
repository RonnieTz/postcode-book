'use client';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddButton from './AddButton';
import { fetchListings } from '@/utilities/actions/fetchListings';
import SiteManagerDialog from './SiteManagerDialog';
import DateCell from './DateCell';
import DeleteOption from './DeleteOption';
import { Listing } from '@/utilities/types';
import DatesDialog from './DatesDialog';

const DataTable = () => {
  const [dates, setDates] = useState<string[]>(['Date 1', 'Date 2']);
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

  const rowData = listings.map((data) => {
    return {
      site: data.site,
      postCode: data.postCode,
      company: data.company,
      siteManager: data.siteManager,
      datesVisited: data.datesVisited,
      _id: data._id,
    };
  });
  const colDefs: ColDef[] = [
    {
      field: 'site',
      cellRenderer: (params: ICellRendererParams<Listing>) => {
        return (
          <DeleteOption
            site={params.data?.site!}
            id={params.data?._id!}
            setListings={setListings}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        );
      },
    },
    { field: 'postCode' },
    { field: 'company' },
    {
      field: 'siteManager',
      cellRenderer: (params: ICellRendererParams<Listing>) => {
        return (
          <SiteManagerDialog
            setListings={setListings}
            id={params.data?._id!}
            siteManager={params.data?.siteManager!}
          />
        );
      },
    },
    {
      field: 'datesVisited',
      cellRenderer: (params: ICellRendererParams<Listing>) => {
        return (
          <DatesDialog
            datesVisited={params.data?.datesVisited!}
            setListings={setListings}
            id={params.data?._id!}
          />
        );
      },
    },
  ];
  return (
    <Box marginTop={5} width={'100vw'}>
      <div
        style={{ width: '100%', height: '82vh' }}
        className="ag-theme-quartz"
      >
        <AgGridReact columnDefs={colDefs} rowData={rowData} />
        <AddButton
          setListings={setListings}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
      </div>
      {/* <Table sx={{ maxWidth: '100vw' }}>
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
      </Table> */}
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
