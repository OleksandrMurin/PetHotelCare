
import React, { useState } from 'react';
import Header from '../../components/Header'
import { Box, Container, Step, StepLabel, Stepper } from '@mui/material'
import Footer from '../../components/Footer';
import AnimalInfoStep from './AnimalInfoStep';
import RoomSelectionStep from './RoomSelectionStep';
import RationCard from './RationCard';
import RationAndServicesStep from './RationAndServicesStep';
import OrderSummaryStep from './OrderSummaryStep';
import PaymentStep from './PaymentStep';
import ConfirmationStep from './ConfirmationStep';
function Booking() {
  const [step, setStep] = useState(0);
  const [animalInfo, setAnimalInfo] = useState({});
  const [roomSelection, setRoomSelection] = useState({});
  const [selectedServicesB, setSelectedServicesB] = useState([]);
  const [ration, setRation] = useState({ RationId: 1, price: 0, products: [{ productId: 1, Name: 'Meat', weight: 300, pricePer100g: 0.5 }, { productId: 2, Name: 'Poop', weight: 300.7, pricePer100g: 1.2 }] });
  const steps = ['Animal Info', 'Room Selection', 'Ration and Services', 'Order Summary', 'Payment', 'Confirmation'];

  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];
  const roomPrice = 200; // Цена за комнату за указанный срок (пока что задаем локально)
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
  const animalOptions = [
    { Id: 1, label: 'Dog', value: 'dog' },
    { Id: 1, label: 'Cat', value: 'cat' },
    { Id: 1, label: 'Parrot', value: 'parrot' }
  ];
  const roomsData = [
    { id: 1, name: 'Room 1', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
    { id: 2, name: 'Room 2', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
    { id: 3, name: 'Room 3', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
    { id: 4, name: 'Room 4', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
    { id: 5, name: 'Room 5', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
    { id: 6, name: 'Room 6', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
    { id: 7, name: 'Room 7', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
    { id: 8, name: 'Room 8', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
    // Добавьте больше данных по аналогии
  ];
  const onNext = (data) => {
    if (step === 0) setAnimalInfo(data);
    if (step === 1) setRoomSelection(data);
    if (step === 2) setSelectedServicesB(data);
    setStep(step + 1);
  };
  const onPrev = () => {
    setStep(step - 1);
  };

  return (
    <Box sx={{ paddingTop: '80px', backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Header buttons={buttons} />
        <Container sx={{ padding: '30px 30px', bgcolor: 'white', minHeight:'700px'}}>
          <Stepper activeStep={step} sx={{paddingBottom:'30px'}}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {step === 0 && <AnimalInfoStep animalInfo={animalInfo} onNext={onNext} onPrev={onPrev} animalOptions={animalOptions} />}
          {step === 1 && <RoomSelectionStep roomsData={roomsData} roomSelection={roomSelection} onNext={onNext} onPrev={onPrev} />}
          {step === 2 && <RationAndServicesStep ration={ration} Name={animalInfo.animal?.label} selectedServicesB={selectedServicesB} setRation={setRation} onNext={onNext} onPrev={onPrev} />}
          {step === 3 && <OrderSummaryStep roomPrice={roomPrice} rationPrice={ration.price} servicePrices={servicePrices} onPrev={onPrev}  onNext={onNext}/>}
          {step === 4 && <PaymentStep onNext={onNext} onPrev={onPrev} />}
          {step === 5 && <ConfirmationStep />}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}

export default Booking