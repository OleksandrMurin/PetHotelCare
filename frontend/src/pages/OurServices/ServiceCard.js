import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

function ServiceCard({ service }) {
  return (
    <Card variant='outlined' sx={{ maxWidth: 445, display: 'flex', flexDirection: 'column', gap: 1}}>
      <CardMedia
        component="img"
        alt={service.name}
        image={service.image}
        height={"300px"}
        sx={{ objectFit:'cover' }}
      />
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom variant="h5"  align='center' component="div">
          {service.name}
        </Typography>
        <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}>
          <Typography variant="body1" align='left' sx={{paddingBottom:'20px'}}>
            <strong>Description:</strong> {service.description}
          </Typography>
          <Typography variant="body1" align='left' >
            <strong>Price:</strong> ${service.price}
          </Typography>
        </Box>
      </CardContent>
      <Button align='right' variant="outlined" size="small" color="primary"sx={{margin:"20px 20px"}}>More</Button>
    </Card>
  );
};

export default ServiceCard;