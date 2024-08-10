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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddButton from './AddButton';
import { fetchListings } from '@/utilities/actions/fetchListings';
import { revalidatePath } from 'next/cache';

// const sampleData = [
//   {
//     postcode: 'SW1A 1AA',
//     siteManager: 'John Doe',
//     datesVisited: ['01/01/2021', '02/01/2021', '03/01/2021', '04/01/2021'],
//   },
//   {
//     postcode: 'SW1A 1AB',
//     siteManager: 'Jane Doe',
//     datesVisited: ['01/01/2021', '02/01/2021', '03/01/2021', '04/01/2021'],
//   },
//   {
//     postcode: 'SW1A 1AC',
//     siteManager: 'John Doe',
//     datesVisited: ['01/01/2021', '02/01/2021', '03/01/2021', '04/01/2021'],
//   },
// ];

const DataTable = () => {
  const [listings, setListings] = useState<
    {
      _id: string;
      postCode: string;
      siteManger: string;
      datesVisited: string[];
    }[]
  >([]);
  useEffect(() => {
    const token =
      localStorage.getItem('token')! || sessionStorage.getItem('token')!;
    const fetchData = async () => {
      const data = await fetchListings(token);
      console.log(data);

      setListings(await JSON.parse(data).listings);
    };
    fetchData();
  }, []);
  return (
    <Box marginTop={5} maxWidth={'100vw'}>
      <Table sx={{ maxWidth: '100vw' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">POSTCODE</TableCell>
            <TableCell align="center">SITE MANAGER</TableCell>
            <TableCell align="center">DATES VISITED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((data, index) => (
            <TableRow key={index}>
              <TableCell align="center">{data.postCode}</TableCell>
              <TableCell align="center">{data.siteManger}</TableCell>
              <TableCell align="center">
                <Accordion>
                  <AccordionSummary>
                    <Typography width={'100%'}>View</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {data.datesVisited.map((date, index) => (
                        <ListItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          key={index}
                        >
                          {date}
                        </ListItem>
                      ))}
                      <ListItem
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button>
                          <AddCircleOutlineIcon />
                        </Button>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell padding="none" align="center" colSpan={3}>
              <AddButton setListings={setListings} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default DataTable;
