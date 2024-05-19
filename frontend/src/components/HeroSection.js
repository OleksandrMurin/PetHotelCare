import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function HeroSection() {
  return (
    <Box sx={{
        height: "60vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', // Добавь это для позиционирования псевдоэлемента
        '&::before': { // Псевдоэлемент для затемнения
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Настрой прозрачность по желанию
          zIndex: 1 // Убедись, что слой ниже текста и кнопок
        }
      }}>
        {/* Убедись, что контент находится выше слоя затемнения */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography component="h1" variant="h3" gutterBottom color="white" sx={{ textShadow: "0px 0px 8px rgba(0,0,0,0.7)" }}>
            Welcome to Pet Hotel Management System
          </Typography>
          <Typography variant="h5" color="white" paragraph sx={{ textShadow: "0px 0px 8px rgba(0,0,0,0.7)" }}>
            Experience dedicated care for your pets
          </Typography>
          <Button variant="contained" sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>
            Learn More
          </Button>
        </Box>
      </Box>
  );
}

export default HeroSection;