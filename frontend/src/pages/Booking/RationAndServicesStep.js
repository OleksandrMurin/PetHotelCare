import { Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import RationCard from './RationCard'
import MultipleSelectChip from './MultipleSelectChip';
function RationAndServicesStep({services, selectedServicesB, Name, ration, setRation, onNext, onPrev}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServices, setSelectedServices] = useState(selectedServicesB);
    const editRation = () => {
        setIsEditing(true);
    };
    const handleServiceChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedServices(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const confirmChanges = (newRation) => {
        setRation(newRation);
        setIsEditing(false);
    };
    const handleNext = () => {
      onNext(selectedServices );
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px', gap: 2 }}>
      <Typography variant='h6'>
        Change generated optimal ration for your pet, if you sure 
      </Typography>
      <RationCard ration={ration} Name={"Bars"} isEditing={isEditing} editRation={editRation} confirmChanges={confirmChanges} />
      <Typography variant='h6'>
        Choose services for your pet (optional) 
      </Typography>
      <MultipleSelectChip
          services={services}
          selectedServices={selectedServices}
          handleServiceChange={handleServiceChange}
        />
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Button variant="contained" onClick={onPrev}>
          Previous step
        </Button>
        <Button variant="contained" onClick={handleNext} >
          Next step
        </Button>
      </Box>
      
    </Box>
  );
}

export default RationAndServicesStep