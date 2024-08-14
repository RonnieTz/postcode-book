'use client';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Box, Snackbar, Alert, IconButton, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddButton from './AddButton';
import { fetchListings } from '@/utilities/actions/fetchListings';
import SiteManagerDialog from './SiteManagerDialog';
import { Listing } from '@/utilities/types';
import DatesDialog from './DatesDialog';
import { editCompany } from '@/utilities/actions/editCompany';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteListing } from '@/utilities/actions/deleteListing';

const DataTable = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [deleteButton, setDeleteButton] = useState(true);
  useEffect(() => {
    const token =
      localStorage.getItem('token')! || sessionStorage.getItem('token')!;
    const fetchData = async () => {
      const data = await fetchListings(token);
      setListings(await JSON.parse(data).listings);
    };
    fetchData();
  }, []);

  const onClickDelete = async (id: string, site: string) => {
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
      field: '',
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <IconButton
            onClick={() => {
              onClickDelete(params.data._id, params.data.site);
            }}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        );
      },

      hide: deleteButton,
      cellStyle: { display: 'flex', justifyContent: 'center' },
    },
    {
      field: 'site',
    },
    { field: 'postCode' },
    {
      field: 'company',
      editable: true,
      onCellValueChanged: async (params) => {
        const id = params.data._id;
        const newValue = params.newValue;
        const token =
          localStorage.getItem('token')! || sessionStorage.getItem('token')!;
        const res = await editCompany(token, id, newValue);
        if (res.successfull) {
          const data = await fetchListings(token);
          setListings(await JSON.parse(data).listings);
          setSnackbarMessage(`Successfully updated "${params.data.site}"`);
          setSnackbarOpen(true);
        }
      },
    },
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
      valueFormatter: (params) => {
        return params.value.length;
      },
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
        <Button
          variant="contained"
          onClick={() => setDeleteButton(!deleteButton)}
        >
          Delete
        </Button>
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
