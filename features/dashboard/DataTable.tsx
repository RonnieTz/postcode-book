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
import DeleteOption from './DeleteOption';
import { Listing } from '@/utilities/types';
import DatesDialog from './DatesDialog';

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
        style={{ width: '100%', height: '800px' }}
        className="ag-theme-quartz"
      >
        <AgGridReact columnDefs={colDefs} rowData={rowData} />
        <AddButton
          setListings={setListings}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
        <div style={{ height: '60px', width: '100%' }}></div>
      </div>

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
