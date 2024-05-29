import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HeroSection({ imgLink, heading, description, button }) {
  return (
    <Box sx={{
      height: "60vh",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      backgroundImage: `url(${imgLink})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative', 
      '&::before': { 
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1 
      }
    }}>
      <Box sx={{zIndex: 2, margin: "60px 50px" }}>
        <Typography component="h1" variant="h3" gutterBottom color="white" sx={{ textShadow: "0px 0px 8px rgba(0,0,0,0.7)" }}>
          {heading}
        </Typography>
        <Typography variant="h5" color="white" paragraph sx={{ textShadow: "0px 0px 8px rgba(0,0,0,0.7)" }}>
          {description}
        </Typography>
        {button &&
          <Button variant="contained" component={Link} to='/about' sx={{ bgcolor: 'secondary.main', padding: "10px 20px", '&:hover': { bgcolor: 'secondary.dark' } }}>
            Learn More
          </Button>}
      </Box>
    </Box>
  );
}

export default HeroSection;