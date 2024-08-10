'use client';
import { Button } from '@mui/material';

import React from 'react';

const Logout = () => {
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <Button onClick={logout} sx={{ position: 'fixed', top: 0, right: 0 }}>
      Logout
    </Button>
  );
};

export default Logout;
