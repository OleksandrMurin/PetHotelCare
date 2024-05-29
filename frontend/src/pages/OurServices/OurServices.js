import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import { Typography, Container, Box } from '@mui/material';
import Footer from '../../components/Footer';
import ServiceCard from './ServiceCard';


function OurServices() {
  const imgLink = 'https://images.squarespace-cdn.com/content/v1/6445d28dacc3f86a93dfaddb/b0ef04c0-c99d-4a0d-a344-318d9dc54e6a/D85_1359.jpg'
  const heading ='Our Services'
  const description = 'Explore our services list and choose the ones your pet really needs'
  const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Our Services', path: '/services' },
    { label: 'Booking', path: '/booking' },
    { label: 'About Us', path: '/about' }
  ];
  const [services, setServices] = useState([]);

  const servicesData = [
    { id: 1, name: 'Grooming', image: 'https://d2zdpiztbgorvt.cloudfront.net/us/cms_content/616/cc1d90d3b03441e5b261d85a3a98445a.jpg', description: 'Full grooming service, including haircuts, bathing, and ear cleaning. Our experienced groomers ensure your pet looks and feels their best with professional care.', price: 50 },
    { id: 2, name: 'Walking', image: 'https://dogsbestlife.com/wp-content/uploads/2019/05/dog-walker-vs.-pet-sitter.jpeg', description: 'Daily dog walking with our professional dog sitters. We guarantee that your dogs get the necessary physical activity and attention they need.', price: 20 },
    { id: 3, name: 'Training', image: 'https://www.pawcommons.com/wp-content/uploads/2022/02/hillcrest-training-1.jpg', description: 'Professional training sessions for dogs, including basic commands and behavior correction. Our trainers will help your pet become obedient and confident.', price: 100 },
    { id: 5, name: 'Veterinary Checkup', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-xeVkByjlrjmjTfXPUXY_WBuPH35hNA_BdA&s', description: 'Regular health checkups by qualified veterinarians. We take care of your pets health by offering comprehensive exams and consultations.', price: 80 },
    { id: 8, name: 'Pet Daycare', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOgxUbpbsnhjBrAddWaYyuYclxLqZ4UrQZCW1KXWdWA&s', description: 'Daily care for your pets while you are at work. We provide a safe and stimulating environment where your pets can play and rest under the supervision of our staff.', price: 40 },
    
  ];

  useEffect(() => {
    setServices(servicesData);
  }, []);
  
  
  return (
    <Box sx={{backgroundImage: 'url(https://img.freepik.com/premium-vector/seamless-dog-pattern-with-paw-prints-bones-hearts-balls-cat-foot-texture-pattern-with-doggy-pawprint-bones-dog-texture-hand-drawn-vector-illustration-doodle-style-white-background_192280-1320.jpg)'}}>
      <Box sx={{paddingTop: '80px', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
        <Header buttons={buttons} />
        <HeroSection imgLink={imgLink} heading={heading} description={description}/>
        <Box sx={{ padding: '30px', display: 'flex', flex: '1 1', flexWrap: 'wrap', justifyContent:"center", gap: 3}}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default OurServices
