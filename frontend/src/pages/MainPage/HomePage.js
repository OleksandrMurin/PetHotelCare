
import React, { useState } from 'react';
import { Navigate  } from 'react-router-dom'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import { Alert } from '@mui/material'

const HomePage = () => {
  const [content, setContent] = useState(null);
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Login', path: '/signin' }
  ];
  const handleSignIn = () => {
    // Логика для обработки входа
    setContent(<Alert severity="success">This is a success Alert.</Alert>);
  };

  const handleSignUp = () => {
    // Логика для обработки регистрации
    setContent(<Alert severity="error">This is an error Alert.</Alert>);
  };
  return (
    <div>
      <Header onSignIn={handleSignIn} onSignUp={handleSignUp} content={content} buttons={buttons} />
      <HeroSection />
    </div>
  );
}

export default HomePage