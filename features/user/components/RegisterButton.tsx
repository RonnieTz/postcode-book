import { Button, CircularProgress, Typography } from '@mui/material';
import { useFormStatus } from 'react-dom';

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      sx={{ width: '20%', height: '3rem' }}
      variant="contained"
      color="primary"
      type="submit"
    >
      {pending ? (
        <CircularProgress color="success" />
      ) : (
        <Typography>Register</Typography>
      )}
    </Button>
  );
};

export default RegisterButton;
