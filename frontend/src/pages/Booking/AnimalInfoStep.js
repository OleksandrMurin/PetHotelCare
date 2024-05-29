import React, { useState } from 'react';
import { Box, Select, MenuItem, TextField, Button, Typography, FormControl, InputLabel } from '@mui/material';

const AnimalInfoStep = ({ onNext }) => {
  const [animal, setAnimal] = useState('');
  const [activity, setActivity] = useState('');
  const [weight, setWeight] = useState('');

  const animalOptions = [
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Parrot', value: 'parrot' }
  ];

  const activityOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Semi-active', value: 'Semi-active' },
    { label: 'Passive', value: 'Passive' }
  ];

  const handleNext = () => {
    if (animal && activity && weight) {
      onNext({ animal, activity, weight });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Fill actual information about your pet</Typography>
      <FormControl fullWidth>
        <InputLabel id="animal-select-label">Select your pet</InputLabel>
        <Select
          labelId="animal-select-label"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
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
      <Button variant="contained" onClick={handleNext} sx={{ alignSelf: 'flex-end' }}>
        Next step
      </Button>
    </Box>
  );
};

export default AnimalInfoStep;
