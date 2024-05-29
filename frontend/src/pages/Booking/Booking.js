
import React, { useState } from 'react';
import Header from '../../components/Header'
import { Box, Container } from '@mui/material'
import Footer from '../../components/Footer';
import AnimalInfoStep from './AnimalInfoStep';
import RoomSelectionStep from './RoomSelectionStep';
import RationCard from './RationCard';
import RationAndServicesStep from './RationAndServicesStep';
import OrderSummaryStep from './OrderSummaryStep';
function Booking() {
  const [ration, setRation] = useState({ RationId: 1, price: 0, products: [{ productId: 1, Name: 'Meat', weight: 300, pricePer100g: 0.5 }, { productId: 2, Name: 'Poop', weight: 300.7, pricePer100g: 1.2 }] });
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];
  const roomPrice = 200; // Цена за комнату за указанный срок (пока что задаем локально)
  const rationPrice = 100; // Цена за рацион
  const servicePrices = [50, 75];
  const services = [
    { name: 'Grooming', price: 50 },
    { name: 'Walking', price: 20 },
    { name: 'Training', price: 100 },
    { name: 'Veterinary Checkup', price: 80 },
    { name: 'Pet Daycare', price: 40 },
    { name: 'Feeding', price: 30 },
    { name: 'Bathing', price: 25 },
  ];

  return (
    <Box sx={{ paddingTop: '80px', backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Header buttons={buttons} />
        <Container sx={{ padding: '30px 30px', bgcolor:'white' }}>
          <AnimalInfoStep />
          <RoomSelectionStep />
          <RationAndServicesStep ration={ration} setRation={setRation} />
          <OrderSummaryStep roomPrice={roomPrice} rationPrice={rationPrice} servicePrices={servicePrices} />
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}

export default Booking