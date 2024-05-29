import React from 'react';
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';

function PhotoGallery() {
    const photos = [
        { img: 'photo1.jpg', title: 'Room 1' },
        { img: 'photo2.jpg', title: 'Play Area' },
        { img: 'photo3.jpg', title: 'Grooming' },
        // Add more photos as needed
      ];
  return (
    
    <Box sx={{ padding: '20px 250px'}}>
        <Typography variant='h4'>
            PhotoGallery
        </Typography>
        <ImageList variant="masonry" cols={3} gap={8}>
        {photos.map((photo, index) => (
            <ImageListItem key={index}>
            <img
                src={photo.img}
                alt={photo.title}
                loading="lazy"
            />
            </ImageListItem>
        ))}
        </ImageList>
    </Box>
  )
}

export default PhotoGallery