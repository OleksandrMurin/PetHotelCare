import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Avatar, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MyPets = ({ pets, setPets }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  const handleAddClick = () => {
    setCurrentPet({ id: null, name: '', birthDate: '', breed: '', additionalInfo: '', avatar: '' });
    setEditDialogOpen(true);
  };

  const handleEditClick = (pet) => {
    setCurrentPet(pet);
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setCurrentPet(null);
  };

  const handleSave = () => {
    setPets((prevPets) =>
      currentPet.id
        ? prevPets.map((pet) => (pet.id === currentPet.id ? currentPet : pet))
        : [...prevPets, { ...currentPet, id: Date.now() }]
    );
    handleClose();
  };

  const handleDeleteClick = (petId) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPet({ ...currentPet, [name]: value });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Pets
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {pets.map((pet) => (
          <Card key={pet.id} sx={{ width: 400 }}>
            <CardContent>
              <Avatar src={pet.avatar} sx={{ width: 200, height: 200, margin: '0 auto 10px' }} />
              <Typography variant="h5" align="center" component="div">
                {pet.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Birth Date:</strong> {pet.birthDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Breed: </strong>{pet.breed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Additional Info:</strong> {pet.additionalInfo}
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
        ))}
        <IconButton onClick={handleAddClick} sx={{ alignSelf: 'center', marginTop: 2 }}>
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <Dialog open={editDialogOpen} onClose={handleClose}>
        <DialogTitle>{currentPet && currentPet.id ? 'Edit Pet' : 'Add Pet'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentPet && currentPet.id ? 'Update the information of your pet.' : 'Enter the information of your new pet.'}
          </DialogContentText>
          {currentPet && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                name="name"
                value={currentPet.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Birth Date"
                name="birthDate"
                type="date"
                value={currentPet.birthDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="Breed"
                name="breed"
                value={currentPet.breed}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Additional Info"
                name="additionalInfo"
                value={currentPet.additionalInfo}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Avatar URL"
                name="avatar"
                value={currentPet.avatar}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyPets;
