import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationStep = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '700px', gap: 2 }}>
        <Box sx={{border:'1px solid black', borderRadius:'9px', padding:'100px 50px'}}>
            <Typography variant="h4" align="center">
                <CheckCircleIcon color='success'  sx={{ fontSize: 30 }}/>
                Booking Successful!
            </Typography>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                Thank you for your order. You can view your bookings in your personal account.
            </Typography>
        </Box>
        <Button  variant='outlined' size='big' color ='primary' component = {Link} to= '/' sx={{justifySelf:'flex-end'}}>
            Back to main page
        </Button>
    </Box>
  );
};

export default ConfirmationStep;
