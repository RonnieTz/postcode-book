import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import React from 'react';
import AddDate from './AddDate';
import { Listing, SetListings } from '@/utilities/types';

type Props = {
  data: Listing;
  setListings: SetListings;
};

const DateCell = ({ data, setListings }: Props) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography width={'100%'}>View</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <Divider variant="fullWidth" />
          <ListItem>
            <Table size="small" sx={{ width: '100%' }}>
              <TableBody>
                {data.datesVisited.map((date, index) => {
                  return (
                    <TableRow>
                      <TableCell align="right">
                        <Typography fontSize={13}>{index + 1}:</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={600}>{date}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AddDate setListings={setListings} id={data._id} />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default DateCell;
