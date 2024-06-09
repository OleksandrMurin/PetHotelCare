
import React, { useContext, useState } from 'react';
import { Navigate  } from 'react-router-dom'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import { Alert, Box } from '@mui/material'
import Footer from '../../components/Footer';
import WhyChooseUsSection from './WhyChooseUsSection';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';
import AuthContext from '../../contexts/AuthProvider';
import AuthDialog from '../../components/AuthDialog';


const HomePage = () => {
  const imgLink = 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg'
  const heading ='Welcome to Our Pet Hotel'
  const description = 'Experience dedicated care for your pets'
  const [authDialogType, setAuthDialogType] = useState(null);
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' },
  ];
  const handleSignIn = () => setAuthDialogType('signIn');
  const handleSignUp = () => setAuthDialogType('signUp');
  const handleCloseAuthDialog = (type) => setAuthDialogType(type ? type : null);
  return (
    <Box sx={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '800px' }}>
        <Header handleSignIn={handleSignIn} handleSignUp={handleSignUp} buttons={buttons} />
        <HeroSection imgLink={imgLink} heading={heading} description={description} button />
        <WhyChooseUsSection />
        <Footer />
      </Box>
      <AuthDialog open={authDialogType !== null} onClose={handleCloseAuthDialog} type={authDialogType} />
    </Box>
  );
}

export default HomePage