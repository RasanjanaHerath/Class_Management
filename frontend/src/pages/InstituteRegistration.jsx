import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

const InstituteRegistration = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({ phoneNo: '', city: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Validation function
  const validateInputs = () => {
    const validationErrors = { phoneNo: '', city: '' };
    let isValid = true;

    // Validate phone number
    if (!phoneNo) {
      validationErrors.phoneNo = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNo)) {
      validationErrors.phoneNo = 'Phone number must be 10 digits.';
      isValid = false;
    }

    // Validate city
    if (!city) {
      validationErrors.city = 'City is required.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      setSnackbarMessage('Institute registered successfully!');
      setOpenSnackbar(true);
      setPhoneNo('');
      setCity('');
      setErrors({ phoneNo: '', city: '' }); // Clear errors
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <div className="text-center mb-6">
        <Typography variant="h4" className="font-semibold text-gray-700">
          Institute Management
        </Typography>
      </div>

      <div className="">

      <Paper className="p-6 rounded-lg shadow-lg bg-white">
        <Typography variant="h6" className="mb-4 text-center mb-8">
          Register Institute
        </Typography>
        <TextField
          label="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          fullWidth
          className="mb-3"
          error={!!errors.phoneNo}
          helperText={errors.phoneNo}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          className="mb-3"
          error={!!errors.city}
          helperText={errors.city}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: '#2d3748',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'none',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#4a5568',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
            },
            '&:focus': {
              outline: 'none',
              boxShadow: '0 0 10px rgba(63, 81, 181, 0.6)',
            },
          }}
        >
          Register
        </Button>
      </Paper>

      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InstituteRegistration;
