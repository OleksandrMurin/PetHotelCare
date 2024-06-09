import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import { Typography, Container, Box } from '@mui/material';
import Footer from '../../components/Footer';
import ServiceCard from './ServiceCard';
import AuthContext from '../../contexts/AuthProvider';
import axios from 'axios';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';
import AuthDialog from '../../components/AuthDialog';

function OurServices() {
  const imgLink = 'https://images.squarespace-cdn.com/content/v1/6445d28dacc3f86a93dfaddb/b0ef04c0-c99d-4a0d-a344-318d9dc54e6a/D85_1359.jpg';
  const heading = 'Our Services';
  const description = 'Explore our services list and choose the ones your pet really needs';
  const [authDialogType, setAuthDialogType] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];
  const [services, setServices] = useState([]);

  const handleSignIn = () => setAuthDialogType('signIn');
  const handleSignUp = () => setAuthDialogType('signUp');
  const handleCloseAuthDialog = () => setAuthDialogType(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesResponse = await axios.get('https://localhost:7108/api/PetService?page=1');
        setServices(servicesResponse.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Box sx={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Header handleSignIn={handleSignIn} handleSignUp={handleSignUp} buttons={buttons} />
        <HeroSection imgLink={imgLink} heading={heading} description={description} />
        <Box sx={{ padding: '30px', display: 'flex', flex: '1 1', flexWrap: 'wrap', justifyContent: "center", gap: 3 }}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Box>
        <Footer />
      </Box>
      <AuthDialog open={authDialogType !== null} onClose={handleCloseAuthDialog} type={authDialogType} />
    </Box>
  );
}

export default OurServices;
