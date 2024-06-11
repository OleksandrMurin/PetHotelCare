import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, IconButton, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import AuthContext from '../../contexts/AuthProvider';
import PetCard from './PetCard';
import AddPetDialog from './AddPetDialog';
import EditPetDialog from './EditPetDialog';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '../../constants';

const MyPets = () => {
  const [pets, setPets] = useState({});
  const {connectionAPIString} = useContext(AuthContext)
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const { user } = useContext(AuthContext);
  const [userId] = useState(user.data.id);
  const [petTypes, setPetTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${connectionAPIString}/api/Pet`, { withCredentials: true });
        setPets(response.data.items.reduce((o, x) => ({ ...o, [x.id]: x }), {}));
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const fetchPetTypes = async () => {
    try {
      const response = await axios.get(`${connectionAPIString}/api/Breed?page=1`, { withCredentials: true });
      setPetTypes(response.data.items);
    } catch (error) {
      console.error('Error fetching pet types:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${connectionAPIString}/api/Tag?page=1`, { withCredentials: true });
      setTags(response.data.items);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchPetTypes();
    fetchTags();
  }, []);

  const handleAddClick = () => {
    setCurrentPet({ id: null, name: '', birthDate: '', breedId: '', additionalInfo: '', image: '', prohibitedTags: [] });
    setAddDialogOpen(true);
  };

  const handleEditClick = (pet) => {
    setCurrentPet(pet);
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setAddDialogOpen(false);
    setCurrentPet(null);
  };

  const handleAddSave = async (localPet) => {
    try {
      const response = await axios.post(`${connectionAPIString}/api/Pet`, { ...localPet, userId }, { withCredentials: true });
      setPets((prevPets) => ({ ...prevPets, [response.data.id]: response.data }));
    } catch (error) {
      console.error('Error adding pet:', error);
    }
    handleClose();
  };

  const handleEditSave = async (localPet) => {
    try {
      await axios.put(`${connectionAPIString}/api/Pet?id=${localPet.id}`, localPet, { withCredentials: true });
      const response = await axios.get(`${connectionAPIString}/api/Pet/getById?id=${localPet.id}`, { withCredentials: true });
      setPets((prevPets) => {
        const updatedPets = { ...prevPets, [localPet.id]: response.data };
        return updatedPets;
      });
    } catch (error) {
      console.error('Error updating pet:', error);
    }
    handleClose();
  };

  const handleDeleteClick = async (petId) => {
    try {
      await axios.delete(`${connectionAPIString}/api/Pet?id=${petId}`, { withCredentials: true });
      setPets((prevPets) => {
        const newPets = { ...prevPets };
        delete newPets[petId];
        return newPets;
      });
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Pets
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {Object.keys(pets).map((key) => (
          <PetCard key={key} pet={pets[key]} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} tags={tags} />
        ))}
        <IconButton onClick={handleAddClick} sx={{ alignSelf: 'center', marginTop: 2 }}>
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <AddPetDialog
        open={addDialogOpen}
        onClose={handleClose}
        onSave={handleAddSave}
        petTypes={petTypes}
        tags={tags}
        avatarFile={avatarFile}
        setAvatarFile={setAvatarFile}
        userId={userId}
      />
      <EditPetDialog
        open={editDialogOpen}
        onClose={handleClose}
        onSave={handleEditSave}
        pet={currentPet}
        petTypes={petTypes}
        tags={tags}
        avatarFile={avatarFile}
        setAvatarFile={setAvatarFile}
        userId={userId}
      />
    </Box>
  );
};


export default MyPets;
