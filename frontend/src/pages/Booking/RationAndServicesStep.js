import { Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import RationCard from './RationCard'
import MultipleSelectChip from './MultipleSelectChip';
function RationAndServicesStep({services, ration, setRation}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h6'>
        Change generated optimal ration for your pet, if you sure 
      </Typography>
      <RationCard ration={ration} Name={'Bars'} isEditing={isEditing} editRation={editRation} confirmChanges={confirmChanges} />
      <Typography variant='h6'>
        Choose services for uor pet (optional) 
      </Typography>
      <MultipleSelectChip
          services={services}
          selectedServices={selectedServices}
          handleServiceChange={handleServiceChange}
        />
      <Button variant="contained" sx={{ alignSelf: 'flex-end' }}>
        Next step
      </Button>
    </Box>
  );
}

export default RationAndServicesStep