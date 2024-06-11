import React, { useState, useEffect, useContext } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AuthContext from '../../contexts/AuthProvider';
import AccountData from './AccountData'; 
import MyPets from './MyPets';
import MyBookings from './MyBookings';
import axios from 'axios';

function Account() {
  const [selectedTab, setSelectedTab] = useState('accountData');
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({ ...user.data });
  const [bookings, setBookings] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const {connectionAPIString} = useContext(AuthContext)
  useEffect(() => {
    const getBookings = async () => {
      
      try {
        const response = await axios.get(`${connectionAPIString}/api/Booking`, { withCredentials: true });
        setBookings(response.data.items);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    getBookings();
  }, [connectionAPIString]);

  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' },
  ];

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Box sx={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)' }}>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
        <Header buttons={buttons} authorized={true} />
        <Box sx={{ display: 'flex', paddingTop: '80px' }}>
          <Drawer
            variant="permanent"
            sx={{
              width: "240px",
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
            }}
          >
            <Box sx={{ overflow: 'auto', paddingTop: '80px' }}>
              <List>
                <ListItem button onClick={() => handleTabChange('accountData')}>
                  <ListItemText primary="Account details" />
                </ListItem>
                <ListItem button onClick={() => handleTabChange('myPets')}>
                  <ListItemText primary="My pets" />
                </ListItem>
                <ListItem button onClick={() => handleTabChange('myBookings')}>
                  <ListItemText primary="My bookings" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box sx={{ flexGrow: 1, p: 3, minHeight: '700px' }}>
            {selectedTab === 'accountData' && <AccountData userData={userData} setUserData={setUserData} avatarFile={avatarFile} setAvatarFile={setAvatarFile} />}
            {selectedTab === 'myPets' && <MyPets />}
            {selectedTab === 'myBookings' && <MyBookings bookingsData={bookings} setBookings={setBookings}/>}
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Account;
