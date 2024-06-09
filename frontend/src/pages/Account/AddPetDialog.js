import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Avatar, IconButton, Select, MenuItem, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '../../constants';

const AddPetDialog = ({ open, onClose, onSave, petTypes, tags, avatarFile, setAvatarFile, userId }) => {
    const [localPet, setLocalPet] = useState({
        name: '',
        birthDate: '',
        breedId: '',
        additionalInfo: '',
        image: '',
        prohibitedTags: []
    });

    useEffect(() => {
    }, [localPet]);

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleUploadAvatar = async () => {
        if (avatarFile) {
            const formData = new FormData();
            formData.append('file', avatarFile);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(CLOUDINARY_URL, formData);
                setLocalPet({ ...localPet, image: response.data.secure_url });
                setAvatarFile(null);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleSave = async () => {
        await handleUploadAvatar();
        onSave(localPet);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalPet({ ...localPet, [name]: value });
    };

    const handleTagChange = (e) => {
        setLocalPet({ ...localPet, prohibitedTags: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Pet</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the information of your new pet.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    name="name"
                    value={localPet.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    value={localPet.birthDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <Select
                    label="Breed"
                    name="breedId"
                    value={localPet.breedId}
                    onChange={handleChange}
                    fullWidth
                >
                    {petTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    margin="dense"
                    label="Additional Info"
                    name="additionalInfo"
                    value={localPet.additionalInfo}
                    onChange={handleChange}
                    fullWidth
                    multiline
                />
                <TextField
                    margin="dense"
                    label="Avatar URL"
                    name="image"
                    value={localPet.image}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{ marginTop: 2 }}
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                <Select
                    label="Prohibited Tags"
                    multiple
                    value={localPet.prohibitedTags}
                    onChange={handleTagChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={tags.find(tag => tag.id === value)?.name || value} />
                            ))}
                        </Box>
                    )}
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag.id} value={tag.id}>
                            {tag.name}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPetDialog;
