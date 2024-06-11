import React, { useContext } from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../contexts/AuthProvider';
const MyBookings = ({ bookingsData, setBookings }) => {
  const {connectionAPIString} = useContext(AuthContext)
  const handleDeleteClick = async (bookingId) => {
    try {
      await axios.delete(`${connectionAPIString}/api/Booking?bookingId=${bookingId}`, { withCredentials: true });
      const response = await axios.get(`${connectionAPIString}/api/Booking`, { withCredentials: true });
        setBookings(response.data.items);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
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
                {booking.petId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Check-In Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Check-Out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Room ID:</strong> {booking.roomId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Ration ID:</strong> {booking.rationId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Services:</strong> {Object.values(booking.petServices).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Total Price:</strong> ${booking.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
              <Button variant="outlined" size="small" color="primary">View Details</Button>
              <Button variant="outlined" size="small" color="secondary" onClick={() => handleDeleteClick(booking.id)}>Cancel Booking</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyBookings;
