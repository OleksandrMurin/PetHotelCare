import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const OrderSummaryStep = ({ roomPrice, rationPrice, servicePrices, onPrev, onNext }) => {
  const totalServicePrice = servicePrices.reduce((total, price) => total + price, 0);
  const totalPrice = roomPrice + rationPrice + totalServicePrice;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px', gap: 2 }}>
      <Box sx={{ maxWidth: 600, minWidth:'400px', margin: '0 auto', padding: '50px', boxShadow: 3 }}>
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
      <Box sx={{display:'flex', justifyContent:'space-between', paddingTop:'20px'}}>
        <Button variant="contained" onClick={onPrev}>
          Previous step
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next step
        </Button>
      </Box>
      
    </Box>
    
  );
};

export default OrderSummaryStep;
