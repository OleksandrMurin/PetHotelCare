import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const OrderSummaryStep = ({ roomPrice, rationPrice, selectedServicesB, onPrev, onNext }) => {
  const [services, setServices] = useState([]);
  const [servicePrices, setServicePrices] = useState([]);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://localhost:7108/api/PetService?page=1', { withCredentials: true });
        setServices(response.data.items);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const prices = selectedServicesB.map(serviceId => {
      const service = services.find(s => s.id === serviceId);
      return service ? service.price : 0;
    });

    const details = selectedServicesB.map(serviceId => {
      const service = services.find(s => s.id === serviceId);
      return service ? { name: service.name, price: service.price } : { name: 'Unknown', price: 0 };
    });

    setServicePrices(prices);
    setSelectedServiceDetails(details);
  }, [services, selectedServicesB]);

  const totalServicePrice = servicePrices.reduce((total, price) => total + price, 0);
  const totalPrice = roomPrice + rationPrice + totalServicePrice;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px', gap: 2 }}>
      <Box sx={{ maxWidth: 600, minWidth: '400px', margin: '0 auto', padding: '50px', boxShadow: 3 }}>
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
          {selectedServiceDetails.map((service, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Service: ${service.name}`} secondary={`$${service.price}`} />
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText primary="Total Price" secondary={`$${totalPrice}`} />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
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
