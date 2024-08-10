'use client';

import React, { use } from 'react';
import '../styles.css';
import { TextField, Button, Typography, Alert } from '@mui/material';
import Link from 'next/link';
import { register } from '@/utilities/actions/register';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import RegisterButton from './RegisterButton';

const Register = () => {
  const [state, action] = useFormState(register, null);
  useEffect(() => {
    if (state?.successFull) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, [state]);

  return (
    <form action={action} className="login">
      <TextField name="username" sx={{ width: '50%' }} label="Username" />
      <TextField
        name="password"
        sx={{ width: '50%' }}
        label="Password"
        type="password"
      />
      <TextField
        name="confirmPassword"
        sx={{ width: '50%' }}
        label="Confirm password"
        type="password"
      />

      <RegisterButton />
      <Typography textAlign={'center'} variant="body2" sx={{ width: '50%' }}>
        Already have an account?{' '}
        <Link
          style={{
            textDecoration: 'none',
            color: 'royalblue',
            fontWeight: 500,
            fontSize: '1rem',
          }}
          href="/login"
        >
          Login
        </Link>
      </Typography>

      {state?.message && (
        <Alert
          variant="outlined"
          severity={state?.successFull ? 'success' : 'error'}
        >
          {state?.message}
        </Alert>
      )}
    </form>
  );
};

export default Register;
