import React from 'react';
import { Box, Typography } from '@mui/material';

const User = ({ user }: { user: string | null }) => {
  return (
    <Box position={'fixed'} top={4} left={'50%'} sx={{ translate: '-50%' }}>
      <Typography display={'inline'}>Welcome </Typography>
      <Typography
        variant="button"
        color={'blue'}
        fontSize={16}
        fontWeight={700}
        display={'inline'}
      >
        {user}
      </Typography>
    </Box>
  );
};

export default User;
