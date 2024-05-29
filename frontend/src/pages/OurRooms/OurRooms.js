import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import { Typography, Container, Box } from '@mui/material';
import { get } from '../../components/Api';
import Footer from '../../components/Footer';
import CategoriesContent from './CategoriesContent';

function OurRooms() {
  const imgLink = 'https://i.pinimg.com/originals/8f/b2/b6/8fb2b6abb857e1b07d40ea6c3cb7dd5a.jpg'
  const heading ='Our Rooms'
  const description = 'Explore our rooms and choose the best for your pet'
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);

  const categoriesData = [
    { id: 1, name: 'Deluxe Rooms' },
    { id: 2, name: 'Standard Rooms' },
  ];

  const roomsData = [
    { id: 1, name: 'Deluxe Room 1', image: 'https://www.telegraph.co.uk/content/dam/family/2021/06/22/dog-hotel-love_4_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXH-5rYAcEMfZ-k6qzXXxMMM.jpg', description: 'A deluxe room', pricePerDay: 100, roomTypeId: 1 },
    { id: 2, name: 'Deluxe Room 2', image: 'https://i.dailymail.co.uk/i/newpix/2018/09/14/10/5028E29A00000578-6167415-image-a-44_1536918358686.jpg', description: 'Another deluxe room', pricePerDay: 120, roomTypeId: 1 },
    { id: 3, name: 'Standard Room 1', image: 'https://i.pinimg.com/236x/69/23/01/69230112099cd637970f71f9e8af8f62.jpg', description: 'A standard room', pricePerDay: 80, roomTypeId: 2 },
    { id: 4, name: 'Standard Room 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5YWzJqu0L7221gRNxZ90xTKiJPeHQk7IiF4H4MHQwckhdCxicPzFjAP_pe0bVk1WWxrQ&usqp=CAU', description: 'Another standard room', pricePerDay: 90, roomTypeId: 2 },
    { id: 5, name: 'Deluxe Room 1', image: 'https://i.dailymail.co.uk/i/newpix/2018/09/14/10/5028E02B00000578-6167415-image-a-49_1536918392773.jpg', description: 'A deluxe room', pricePerDay: 100, roomTypeId: 1 },
    { id: 6, name: 'Deluxe Room 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fCdyleJTGvNU4x3ig7eXr4t_UCQYUHGaqkHvqoKHsvDHus6J0dOogxULKychfOI30Xw&usqp=CAU', description: 'Another deluxe room', pricePerDay: 120, roomTypeId: 1 },
    { id: 7, name: 'Standard Room 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHTzqavNt_5lM5FjwIrWGSE-_6B3XqT-Jnm4u1U215rNt9Tn1yt6kzwmCe34gYTtyb_c&usqp=CAU', description: 'A standard room', pricePerDay: 80, roomTypeId: 2 },
    { id: 8, name: 'Standard Room 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXSF8qJ2XcCyEEXSkdI4jfvnBvdXYJZ570U9M38ZZcPisEnixO7iORJBulaURE3HAJoU&usqp=CAU', description: 'Another standard room', pricePerDay: 90, roomTypeId: 2 },
  ];

  useEffect(() => {
    setCategories(categoriesData);
    setRooms(roomsData);
  }, []);
  
  
  return (
    <Box sx={{backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)'}}>
      <Box sx={{paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
        <Header buttons={buttons} />
        <HeroSection imgLink={imgLink} heading={heading} description={description}/>
        <Box sx={{}}>
          {categories.map((category) => (
            <CategoriesContent
              key={category.id}
              category={category}
              rooms={rooms.filter((room) => room.roomTypeId === category.id)}
            />
          ))}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default OurRooms;
