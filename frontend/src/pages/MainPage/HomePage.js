
import React, { useState } from 'react';
import { Navigate  } from 'react-router-dom'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import { Alert, Box } from '@mui/material'
import Footer from '../../components/Footer';
import WhyChooseUsSection from './WhyChooseUsSection';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';


const HomePage = () => {
  const imgLink = 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg'
  const heading ='Welcome to Pet Hotel Management System'
  const description = 'Experience dedicated care for your pets'
  const[authorized, setAuthorized] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' },
  ];
  const handleSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };
  const handleAuthorized = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setAuthorized(true)
  };
  return (
    <Box sx={{backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)'}}>
      <Box sx={{display:'flex', flexDirection:'column',paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minHeight: '800px'}}>
      <Header onSignIn={handleSignIn} onSignUp={handleSignUp} buttons={buttons} authorized={authorized} setAuthorized={setAuthorized}/>
      
        {!showSignIn && !showSignUp && 
        <>
          <HeroSection imgLink={imgLink} heading={heading} description={description} button />
          <WhyChooseUsSection />
        </>
        }
        
        {showSignIn && 
          <Box sx={{display: 'flex', minHeight: '800px'}}> 
            <SignIn onSwitchToSignUp={handleSwitchToSignUp} handleAuthorized={handleAuthorized}/> 
          </Box>
        }
        {showSignUp && 
          <Box sx={{display: 'flex', minHeight: '800px'}}> 
            <SignUp onSwitchToSignIn={handleSwitchToSignIn} />
          </Box>
        }
        
      <Footer />
      </Box>
    </Box>
  );
}

export default HomePage