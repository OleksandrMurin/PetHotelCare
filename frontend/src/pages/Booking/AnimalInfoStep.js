import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../contexts/AuthProvider';

const AnimalInfoStep = ({ onNext, animalOptions, animalInfo }) => {
  const [petId, setPetId] = useState(animalInfo.petId || '');
  const [name, setName] = useState(animalInfo.name || '');
  const [activity, setActivity] = useState(animalInfo.activity || '');
  const [weight, setWeight] = useState(animalInfo.weight || '');
  const [activityOptions, setActivityOptions] = useState([]);
  const {connectionAPIString} = useContext(AuthContext)

  useEffect(() => {
    // Функция для получения уникальных значений активности
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${connectionAPIString}/api/Diet?page=1`, { withCredentials: true });
        const diets = response.data.items;
        // Извлекаем уникальные значения активности
        const activities = [...new Set(diets.map(diet => diet.activity))];
        setActivityOptions(activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleAnimalChange = (e) => {
    const selectedAnimal = animalOptions.find(option => option.value === e.target.value);
    setPetId(selectedAnimal.value);
    console.log(selectedAnimal)
    setName(selectedAnimal.label);
  };

  const handleNext = () => {
    if (petId && activity && weight) {
      onNext({petId, activity, weight, name });
    }
    
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px' }}>
      <Typography variant="h6">Fill actual information about your pet</Typography>
      <FormControl fullWidth>
        <InputLabel id="animal-select-label">Select your pet</InputLabel>
        <Select
          labelId="animal-select-label"
          value={petId}
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
          {activityOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
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
