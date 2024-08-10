'use client';

import React, { use } from 'react';
import '../styles.css';
import { TextField, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { register } from '@/utilities/actions/register';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

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

      <Button
        sx={{ width: '20%', height: '3rem' }}
        variant="contained"
        color="primary"
        type="submit"
      >
        Register
      </Button>
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
      {state && (
        <Typography
          variant="subtitle1"
          color={state.successFull ? 'green' : 'red'}
        >
          {state.message as string}
        </Typography>
      )}
    </form>
  );
};

export default Register;
