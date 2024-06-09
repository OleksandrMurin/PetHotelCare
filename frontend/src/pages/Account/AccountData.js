import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, IconButton, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dbxnwzleo/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'cloudName';

const AccountData = ({ userData, setUserData, avatarFile, setAvatarFile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setUserData({ ...userData, [prop]: event.target.value });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        setUserData({ ...userData, avatar: response.data.secure_url });
        setAvatarFile(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     console.log('Attempting to log out...');
  //     const response = await axios.delete('https://localhost:7108/api/Account/Logout', {}, { withCredentials: true });
  //     console.log('Logout response:', response);
  //     // Перенаправляем пользователя на главную страницу после разлогинивания
  //     window.location.href = '/';
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
      <Typography variant="h4" align='center' gutterBottom>
        Account details
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingBottom: '15px' }}>
          <Avatar src={userData.avatar} sx={{ width: 100, height: 100 }} />
          <Box>
            <Typography variant="h6">{userData.name}</Typography>
            <Typography variant="body1">{userData.email}</Typography>
          </Box>
          <IconButton onClick={handleToggleEdit}>
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        {isEditing && (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              value={userData.email}
              onChange={handleChange('email')}
              fullWidth
            />
            <TextField
              label="Name"
              value={userData.name}
              onChange={handleChange('name')}
              fullWidth
            />
            <TextField
              label="Username"
              value={userData.userName}
              onChange={handleChange('userName')}
              fullWidth
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={userData.password}
              onChange={handleChange('password')}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Phone number"
              value={userData.phoneNumber}
              onChange={handleChange('phoneNumber')}
              fullWidth
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: 2 }}
            >
              Upload image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {avatarFile && (
              <Button
                variant="contained"
                onClick={handleUploadAvatar}
                sx={{ marginTop: 2 }}
              >
                Save image
              </Button>
            )}
          </Box>
        )}
        {!isEditing && (
          <Box>
            <Typography variant="body2"><strong>Email:</strong> {userData.email}</Typography>
            <Typography variant="body1"><strong>Name:</strong> {userData.name}</Typography>
            <Typography variant="body1"><strong>Username:</strong> {userData.userName}</Typography>
            <Typography variant="body1"><strong>Password:</strong> {'********'}</Typography>
            <Typography variant="body1"><strong>Phone number:</strong> {userData.phoneNumber}</Typography>
          </Box>
        )}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        // onClick={handleLogout}
        sx={{ marginTop: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AccountData;
