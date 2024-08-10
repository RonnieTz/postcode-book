'use client';

import React, { use } from 'react';
import '../styles.css';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { login } from '@/utilities/actions/login';
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';

const Login = () => {
  const [state, action] = useFormState(login, null);
  const [remember, setRemember] = useState(false);
  useEffect(() => {
    if (state?.successFull && remember) {
      localStorage.setItem('token', state.token as string);
    }
    if (state?.successFull && !remember) {
      sessionStorage.setItem('token', state.token as string);
    }
    if (state?.successFull) {
      console.log('Login successful');

      setTimeout(() => {
        window.location.href = '/';
      }, 200);
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
      <FormControlLabel
        control={<Checkbox />}
        // @ts-ignore
        onChange={(e) => setRemember(e.target.checked)}
        checked={remember}
        label="Remember me"
        sx={{ width: '49%' }}
      />
      <Button
        sx={{ width: '20%', height: '3rem' }}
        variant="contained"
        color="primary"
        type="submit"
      >
        Login
      </Button>
      <Typography textAlign={'center'} variant="body2" sx={{ width: '50%' }}>
        Don't have an account?{' '}
        <Link
          style={{
            textDecoration: 'none',
            color: 'royalblue',
            fontWeight: 500,
            fontSize: '1rem',
          }}
          href="/register"
        >
          Register
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

export default Login;
