import React, { useState } from 'react';
import { Navigate  } from 'react-router-dom'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import { Alert, Box } from '@mui/material'
import Footer from '../../components/Footer';
import AboutUsDescription from './AboutUsDescription';
import AboutUsEmployees from './AboutUsEmployees';
import PhotoGallery from './PhotoGallery';

function AboutUs() {
  const imgLink = 'https://static.dezeen.com/uploads/2022/07/ekar-home-dog-hotel-thailand_dezeen_2364_col_1.jpg'
  const heading ='Our Hotel'
  const description = 'Here you can find detailed information about us'
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ]
  return (
    <Box sx={{backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)'}}>
      <Box sx={{paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
        <Header buttons={buttons} />
        <HeroSection imgLink={imgLink} heading={heading} description={description}/>
        <AboutUsDescription />
        <AboutUsEmployees />
        <PhotoGallery/>
        <Footer />
      </Box>
    </Box>
  )
}

export default AboutUs