import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../img/LogoPet.png'

function Header() {
  return (
    <AppBar position="static" sx={{bgcolor: "black"}}>
      <Toolbar>
      <Box
        sx={{
            width: 80, // Установи нужный размер
            height: 80,
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginRight: 2
        }}
    />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Pet Hotel
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Personal Account</Button>
        <Button color="inherit">My Pets</Button>
        <Button color="inherit">My Orders</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;