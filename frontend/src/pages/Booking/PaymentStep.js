import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const PaymentStep = ({ onNext, onPrev }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px', gap: 2 }}>
      <Box>
        <Typography variant="h4" align="center">
          Payment Step
        </Typography>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Redirection to the payment API
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={onPrev}>
          Previous step
        </Button>
        <Button variant="contained" onClick={onNext}>
          Complete Booking
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentStep;
