import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../img/LogoPet.png';

function Header({ onSignIn, onSignUp, buttons, auth }) {
  
  return (
    <AppBar position="fixed" sx={{ bgcolor: "black" }}>
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
          {buttons.map((value, index) => (
            <Button color="inherit" key = {index} component = {Link} to= {value.path}>{value.label}</Button>
          ))}
        </Box>
        {!auth&&<Box>
          <Button color="inherit" onClick={onSignIn}>Sign in</Button>
          <Button variant="contained" color="primary" onClick={onSignUp}>Sign up</Button>
        </Box>}
        {auth&&<Box>
          <Button color="inherit" onClick={onSignUp}>Account</Button>
        </Box>}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
