import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import CategoriesContent from './CategoriesContent';
import AuthContext from '../../contexts/AuthProvider';
import axios from 'axios';
import AuthDialog from '../../components/AuthDialog';

function OurRooms() {
  const {connectionAPIString} = useContext(AuthContext)
  const imgLink = 'https://i.pinimg.com/originals/8f/b2/b6/8fb2b6abb857e1b07d40ea6c3cb7dd5a.jpg';
  const heading = 'Our Rooms';
  const description = 'Explore our rooms and choose the best for your pet';
  const [authDialogType, setAuthDialogType] = useState(null);
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoriesAndRooms = useCallback(async () => {
    try {
      const categoriesResponse = await axios.get(`${connectionAPIString}/api/RoomType?page=1`, { withCredentials: true });
      const roomsResponse = await axios.get(`${connectionAPIString}/api/Room?page=1`, { withCredentials: true });

      setCategories(categoriesResponse.data.items);
      setRooms(roomsResponse.data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesAndRooms();
  }, [fetchCategoriesAndRooms]);

  const handleSignIn = () => setAuthDialogType('signIn');
  const handleSignUp = () => setAuthDialogType('signUp');
  const handleCloseAuthDialog = () => setAuthDialogType(null);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Header handleSignIn={handleSignIn} handleSignUp={handleSignUp} buttons={buttons} />
        <HeroSection imgLink={imgLink} heading={heading} description={description} />
        <Box sx={{ padding: "20px" }}>
          {categories.map((category) => {
            const categoryRooms = rooms.filter(room => room.roomTypeId === category.id.toString());
            return (
              <CategoriesContent key={category.id} category={category} rooms={categoryRooms} />
            );
          })}
        </Box>
        <Footer />
      </Box>
      <AuthDialog open={authDialogType !== null} onClose={handleCloseAuthDialog} type={authDialogType} />
    </Box>
  );
}

export default OurRooms;
