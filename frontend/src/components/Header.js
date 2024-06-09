import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../img/LogoPet.png';
import AuthContext from '../contexts/AuthProvider';

function Header({ handleSignIn, handleSignUp, buttons }) {
  const {isAuthenticated} = useContext(AuthContext)
  const filteredButtons = isAuthenticated ? buttons : buttons.filter(button => button.label !== 'Booking');
  return (
    <AppBar position="fixed" sx={{ bgcolor: "black", zIndex:2000}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundImage: `url(${logo})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              marginRight: 2
            }}
          />
          <Typography variant="h4" component="div">
            Pet Hotel
          </Typography>
        </Box>
        <Box>
          {filteredButtons.map((value, index) => (
            <Button color="inherit" key = {index} component = {Link} to= {value.path}>{value.label}</Button>
          ))}
        </Box>
        {isAuthenticated ?
        <Box>
          <Button color="inherit" component = {Link} to= '/account'>Account</Button>
        </Box>
        :
        <Box>
          <Button color="inherit" onClick={handleSignIn}>Sign in</Button>
          <Button variant="contained" color="primary" onClick={handleSignUp}>Sign up</Button>
        </Box>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
