import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react'
import AccountData from './AccountData';
import MyPets from './MyPets';
import MyBookings from './MyBookings';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Account() {
  const [selectedTab, setSelectedTab] = useState('accountData');
  const [userData, setUserData] = useState({
    avatar: '/path/to/avatar.jpg',
    email: 'user@example.com',
    name: 'John Doe',
    nickname: 'johndoe',
    password: 'password',
    phone: '+1234567890'
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const initialPetsData = [
    { id: 1, name: 'Bars', birthDate: '2018-01-01', breed: 'Golden Retriever', additionalInfo: 'Very friendly', avatar: 'https://goldendogfarm.com/cdn/shop/files/C99G8563_2048x.jpg?v=1698182078' },
    { id: 2, name: 'Murka', birthDate: '2020-05-15', breed: 'Persian Cat', additionalInfo: 'Loves to sleep', avatar: 'https://thecatsite.com/c/wp-content/uploads/2011/11/persian-cats-1.jpg' },
    { id: 3, name: 'Kesha', birthDate: '2019-07-30', breed: 'Parrot', additionalInfo: 'Can talk', avatar: 'https://www.thesprucepets.com/thmb/r23RBk0t4DC9UHp2pTzuXLz7Jj4=/3600x0/filters:no_upscale():strip_icc()/popular-small-bird-species-390926-hero-d3d0af7bb6ed4947b0c3c5afb4784456.jpg' },
    // Добавьте больше данных по аналогии
  ];
  const bookingsDataA = [
    {
      id: 1,
      petName: 'Bars',
      roomNumber: '101',
      roomType: 'Deluxe',
      dateRange: ['2024-06-01', '2024-06-07'],
      rationPrice: 120,
      services: ['Grooming', 'Walking'],
      totalPrice: 300
    },
    {
      id: 2,
      petName: 'Murka',
      roomNumber: '234',
      roomType: 'Standard',
      dateRange: ['2024-07-10', '2024-07-15'],
      rationPrice: 120,
      services: ['Veterinary Checkup'],
      totalPrice: 200
    },
    // Добавьте больше данных о бронированиях по аналогии
  ];
  const [bookingsData, setBookingsData] = useState(bookingsDataA);
  const [pets, setPets] = useState(initialPetsData);
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
  <Box sx={{backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)'}}>
    <Box sx={{bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
      <Header buttons={buttons} auth/>
      <Box sx={{ display: 'flex', paddingTop:'80px'}}>
        <Drawer
          variant="permanent"
          sx={{
            width: "240px",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
          }}
        >
          <Box sx={{ overflow: 'auto', paddingTop:'80px'}}>
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
        <Box sx={{ flexGrow: 1, p: 3, minHeight: '700px' }}
        >
          {selectedTab === 'accountData' && <AccountData userData={userData} setUserData={setUserData} avatarFile={avatarFile} setAvatarFile={setAvatarFile}/>}
          {selectedTab === 'myPets' && <MyPets pets={pets} setPets={setPets}/>}
          {selectedTab === 'myBookings' && <MyBookings bookingsData={bookingsData} setBookingsData={setBookingsData}/>}
        </Box>
      </Box>
        <Footer/>
    </Box>
  </Box>
  );
};


export default Account