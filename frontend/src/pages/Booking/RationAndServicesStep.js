import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import RationCard from './RationCard';
import MultipleSelectChip from './MultipleSelectChip'; 

function RationAndServicesStep({ ration, Name, animalInfo, selectedServicesB, setSelectedServicesB, availableProducts, setRation, onNext, onPrev }) {
  const [services, setServices] = useState([]);
  // const [selectedServices, setSelectedServices] = useState(selectedServicesB);
  // console.log('Services in RationStep',services)
  // console.log('selectedServices in RationStep',selectedServices)
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

  const handleServiceChange = (event) => {
    setSelectedServicesB(event.target.value);
  };

  const handleNext = () => {
    
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" align='center' gutterBottom>
        Ration and Services
      </Typography>
      <RationCard ration={ration} animalInfo={animalInfo} setRation={setRation} availableProducts={availableProducts} Name={Name}/>
      <Typography variant='h5' sx={{padding:'20px'}}>Select additional services (optional)</Typography>
      <MultipleSelectChip services={services} selectedServices={selectedServicesB} handleServiceChange={handleServiceChange} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button onClick={onPrev}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
}

export default RationAndServicesStep;
