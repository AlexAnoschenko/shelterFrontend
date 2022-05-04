import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CustomizedSnackbars = ({
  open,
  handleClose,
  type = 'info',
  message = '',
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: '100%', fontSize: '16px', background: '#329c6c' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
