import React, { useState } from 'react';
import { Box, Select, MenuItem, TextField, Button, Typography, FormControl, InputLabel } from '@mui/material';

const AnimalInfoStep = ({ onNext, animalOptions, animalInfo }) => {
  const [animal, setAnimal] = useState(animalInfo.animal );
  const [activity, setActivity] = useState(animalInfo.activity );
  const [weight, setWeight] = useState(animalInfo.weight );

  const activityOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Semi-active', value: 'Semi-active' },
    { label: 'Passive', value: 'Passive' }
  ];


  const handleAnimalChange = (e) => {
    const selectedAnimal = animalOptions.find(option => option.value === e.target.value);
    setAnimal(selectedAnimal.value);
  };

  const handleNext = () => {
    if (animal && activity && weight) {
      onNext({animal, activity, weight });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px', gap: 2 }}>
      <Box>

      </Box>
      <Typography variant="h6">Fill actual information about your pet</Typography>
      <FormControl fullWidth>
        <InputLabel id="animal-select-label">Select your pet</InputLabel>
        <Select
          labelId="animal-select-label"
          value={animal}
          onChange={handleAnimalChange}
          label="Select your pet"
        >
          {animalOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="activity-select-label">Activity</InputLabel>
        <Select
          labelId="activity-select-label"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          label="Activity"
        >
          {activityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        type="number"
        fullWidth
      />
      <Box sx={{display:'flex', justifySelf:'flex-end', alignSelf: 'flex-end' }}>
        <Button variant="contained" onClick={handleNext} >
          Next step
        </Button>
      </Box>
      
    </Box>
  );
};
export default AnimalInfoStep;