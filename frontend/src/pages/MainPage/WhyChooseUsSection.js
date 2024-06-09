import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import FeatureItemCard from './FeatureItemCard';

const features = [
  {
    icon: <SecurityIcon />,
    title: "Safe and Secure",
    description: "We prioritize your pet's safety with 24/7 monitoring and secure facilities."
  },
  {
    icon: <PeopleIcon />,
    title: "Experienced Staff",
    description: "Our team of pet care professionals is dedicated to providing the best care."
  },
  {
    icon: <BuildIcon />,
    title: "Customized Services",
    description: "From diet to daily activities, we tailor everything to your pet's needs."
  },
  {
    icon: <OnlinePredictionIcon />,
    title: "Online Booking",
    description: "Easily book stays and services with our user-friendly online system."
  }
];

const WhyChooseUsSection = () => {
  return (
    <Box sx={{ py: 8}}>
      <Typography variant="h4" align="center" gutterBottom>
        Why Choose Our Pet Hotel?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', gap: 20, padding: "20px 20px"  }}>
        <Box sx={{ flex: '1 1 60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://i.pinimg.com/originals/51/c5/da/51c5da93b198b7fda5b7c220ab78ea65.jpg" alt="Description" style={{ maxWidth: '100%', borderRadius:"15px", maxHeight: '100%' }} />
        </Box>
        <Box sx={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          {features.map((value, index) => (
            <FeatureItemCard 
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default WhyChooseUsSection;
