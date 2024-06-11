import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header'
import { Box, Container, Step, StepLabel, Stepper } from '@mui/material'
import Footer from '../../components/Footer';
import AnimalInfoStep from './AnimalInfoStep';
import RoomSelectionStep from './RoomSelectionStep';
import RationAndServicesStep from './RationAndServicesStep';
import OrderSummaryStep from './OrderSummaryStep';
import PaymentStep from './PaymentStep';
import ConfirmationStep from './ConfirmationStep';
import AuthContext from '../../contexts/AuthProvider';
import axios from 'axios';

function Booking() {
  const {connectionAPIString} = useContext(AuthContext)
  const [step, setStep] = useState(0);
  const [animalInfo, setAnimalInfo] = useState({});
  const [roomTotalPrice, setRoomTotalPrice] = useState(null);
  const [rationTotalPrice, setRationTotalPrice] = useState(null);
  const [servicePrices, setServicePrices] = useState([]);
  const [roomSelection, setRoomSelection] = useState({});
  const [selectedServicesB, setSelectedServicesB] = useState([]);
  const [ration, setRation] = useState({});
  const [animalOptions, setAnimalOptions] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [roomType, setRoomType] = useState(null); // Добавил состояние для типа комнаты
  const steps = ['Animal Info', 'Room Selection', 'Ration and Services', 'Order Summary', 'Payment', 'Confirmation'];
  const { isAuthenticated } = useContext(AuthContext);
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(`${connectionAPIString}/api/Pet`, { withCredentials: true });
        setAnimalOptions(response.data.items.map(item => ({
          id: item.id,
          label: item.name,
          value: item.id
        })));
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${connectionAPIString}/api/Product?page=1`, { withCredentials: true });
        setAvailableProducts(response.data.items);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const fetchRation = async (petId, weight, activity) => {
    try {
      const response = await axios.post(`${connectionAPIString}/api/Booking/CreateRation?petId=${petId}&weight=${weight}&activity=${activity}`, { withCredentials: true });
      setRation(response.data);
    } catch (error) {
      console.error('Error fetching ration:', error);
    }
  };

  useEffect(() => {
    const fetchRoomType = async () => {
      if (roomSelection.roomCategory) {
        try {
          const response = await axios.get(`${connectionAPIString}/api/RoomType/getById?id=${roomSelection.roomCategory}`);
          setRoomType(response.data);
        } catch (error) {
          console.error('Error fetching room type:', error);
        }
      }
    };

    fetchRoomType();
  }, [roomSelection.roomCategory]);

  useEffect(() => {
    if (step === 3) {
      if (roomType && roomSelection.dateRange.length === 2) {
        const startDate = new Date(roomSelection.dateRange[0]);
        const endDate = new Date(roomSelection.dateRange[1]);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRoomTotalPrice(diffDays * roomType.pricePerDay);
        console.log('Ration',ration)
        console.log('diffDays',diffDays)
        console.log('selectedServicesB',selectedServicesB)

        setRationTotalPrice(ration.price * diffDays);
      }

      setServicePrices(selectedServicesB.map(service => service.price));
    }
  }, [step]);

  const handleCreateBooking = async () => {
    const bookingData = {
      checkInDate: roomSelection.dateRange[0].toISOString().split("T")[0],
      checkOutDate: roomSelection.dateRange[1].toISOString().split("T")[0],
      price: roomTotalPrice + rationTotalPrice + servicePrices.reduce((a, b) => a + b, 0),
      petId: animalInfo.petId,
      roomId: roomSelection.selectedRoom,
      ration: {
        price: rationTotalPrice,
        productsInRation: ration.productInRation
      },
      petServicesIds: selectedServicesB
    };
    console.log('bookingData',bookingData)
    try {
      const response = await axios.post(`${connectionAPIString}/api/Booking`, bookingData, { withCredentials: true });
      console.log('Booking created:', response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const onNext = (data) => {
    if (step === 0) {
      setAnimalInfo(data);
      fetchRation(data.petId, data.weight * 100, data.activity);
      console.log('AnimalInfo', animalInfo);
    };
    if (step === 1) setRoomSelection(data);
    if (step === 2) ;
    if (step === 4) handleCreateBooking();

    setStep(step + 1);
  };

  const onPrev = () => {
    setStep(step - 1);
  };

  return (
    <Box sx={{ paddingTop: '80px', backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Header buttons={buttons} authorized={isAuthenticated} />
        <Container sx={{ padding: '30px 30px', bgcolor: 'white', minHeight: '700px' }}>
          <Stepper activeStep={step} sx={{ paddingBottom: '30px' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {step === 0 && <AnimalInfoStep animalInfo={animalInfo} onNext={onNext} onPrev={onPrev} animalOptions={animalOptions} />}
          {step === 1 && <RoomSelectionStep roomSelection={roomSelection} onNext={onNext} onPrev={onPrev} />}
          {step === 2 && <RationAndServicesStep ration={ration} animalInfo={animalInfo} Name={animalInfo.name} selectedServicesB={selectedServicesB} setSelectedServicesB={setSelectedServicesB} availableProducts={availableProducts} setRation={setRation} onNext={onNext} onPrev={onPrev} />}
          {step === 3 && <OrderSummaryStep roomPrice={roomTotalPrice} rationPrice={rationTotalPrice} selectedServicesB={selectedServicesB} servicePrices={servicePrices} onPrev={onPrev} onNext={onNext} />}
          {step === 4 && <PaymentStep onNext={onNext} onPrev={onPrev} />}
          {step === 5 && <ConfirmationStep />}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}

export default Booking;
