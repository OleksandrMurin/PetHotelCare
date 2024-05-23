import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../img/LogoPet.png';

function Header({ onSignIn, onSignUp, content }) {
  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
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
          <Button color="inherit">Home</Button>
          <Button color="inherit">Our Rooms</Button>
          <Button color="inherit">Our Services</Button>
          <Button color="inherit">About Us</Button>
        </Box>
        <Box>
          <Button color="inherit" onClick={onSignIn}>Sign in</Button>
          <Button variant="contained" color="primary" onClick={onSignUp}>Sign up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
