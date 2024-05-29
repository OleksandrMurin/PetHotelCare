import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const OrderSummaryStep = ({ roomPrice, rationPrice, servicePrices }) => {
  const totalServicePrice = servicePrices.reduce((total, price) => total + price, 0);
  const totalPrice = roomPrice + rationPrice + totalServicePrice;

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Room Price" secondary={`$${roomPrice}`} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Ration Price" secondary={`$${rationPrice}`} />
        </ListItem>
        <Divider />
        {servicePrices.map((price, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Service ${index + 1} Price`} secondary={`$${price}`} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Total Price" secondary={`$${totalPrice}`} />
        </ListItem>
      </List>
    </Box>
  );
};

export default OrderSummaryStep;
