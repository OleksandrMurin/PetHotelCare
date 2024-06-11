import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Avatar, Typography } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../contexts/AuthProvider';

const PetCard = ({ pet, handleEditClick, handleDeleteClick, tags }) => {
  const [breedName, setBreedName] = useState('');
  const {connectionAPIString} = useContext(AuthContext)
  useEffect(() => {
    if (pet.breedId) {
      fetchBreedName(pet.breedId);
    }
  }, [pet]);

  const fetchBreedName = async (breedId) => {
    try {
      const response = await axios.get(`${connectionAPIString}/api/Breed/getById?id=${breedId}`, { withCredentials: true });
      setBreedName(response.data.name);
    } catch (error) {
      console.error('Error fetching breed name:', error);
    }
  };

  const getTagNames = (tags) => {
    if (typeof tags === 'object' && tags !== null) {
      return Object.values(tags);
    }
    return [];
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Avatar src={pet.image} sx={{ width: 200, height: 200, margin: '0 auto 10px' }} />
        <Typography variant="h5" align="center" component="div">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Birth Date:</strong> {pet.birthDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Breed: </strong>{breedName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Additional Info:</strong> {pet.additionalInfo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Prohibited Tags:</strong> {getTagNames(pet.prohibitedTags).join(', ')}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" size="big" color="primary" sx={{ width: '100px' }} onClick={() => handleEditClick(pet)}>
          Edit
        </Button>
        <Button variant="outlined" size="big" color="secondary" sx={{ width: '100px' }} onClick={() => handleDeleteClick(pet.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
