import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import logo from '../img/LogoPet.png';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'rgba(120, 120, 120, 0.7)', p: 6 }}>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            <img src={logo} alt="Pet Hotel Logo" style={{ width: '30px', marginRight: '10px' }} />
            Pet Hotel Management System
          </Typography>
          <Typography variant="body2" color="textSecondary">
            © 2024 Pet Hotel Management System. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/about" color="inherit">
            About Us
          </Link>
          <br />
          <Link href="/rooms" color="inherit">
            Our Rooms
          </Link>
          <br />
          <Link href="/services" color="inherit">
            Our Services
          </Link>
          <br />
          <Link href="/booking" color="inherit">
            Booking
          </Link>
          <br />
          <Link href="/signin" color="inherit">
            Sign In/Log In
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Connect
          </Typography>
          <Link href="https://www.facebook.com" color="inherit">
            Facebook
          </Link>
          <br />
          <Link href="https://www.instagram.com" color="inherit">
            Instagram
          </Link>
          <br />
          <Link href="https://www.youtube.com" color="inherit">
            Youtube
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
        Pet Hotel Management System © 2024
      </Typography>
    </Box>
  );
}

export default Footer;
