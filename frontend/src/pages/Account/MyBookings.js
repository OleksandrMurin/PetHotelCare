import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';



const MyBookings = ({ bookingsData, setBookingsData }) => {
  const handleSetBookingsData = (id) => {
    setBookingsData(bookingsData => bookingsData.filter(booking => booking.id !== id));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Bookings
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        {bookingsData.map((booking) => (
          <Card key={booking.id} sx={{ maxWidth: 500 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h5" component="div" align="center">
                {booking.petName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Room Number:</strong> {booking.roomNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Room Type:</strong> {booking.roomType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Date Range:</strong> {booking.dateRange[0]} - {booking.dateRange[1]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Ration Price:</strong> ${booking.rationPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Services:</strong> {booking.services.join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Total Price:</strong> ${booking.totalPrice}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
              <Button variant="outlined" size="small" color="primary">View Details</Button>
              <Button variant="outlined" size="small" color="secondary" onClick={() => handleSetBookingsData(booking.id)}>Cancel Booking</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyBookings;