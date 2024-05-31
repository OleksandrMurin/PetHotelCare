import React from 'react';
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';

function PhotoGallery() {
    const photos = [
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7209.jpg', title: 'Room 1' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/xcvbnmjhg.jpg', title: 'Play Area' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6814.jpg', title: 'Grooming' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_9861.jpg', title: '4' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_9251.jpg', title: '5' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_9167.jpg', title: '6' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7332.jpg', title: '7' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7319.jpg', title: '8' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7186.jpg', title: '9' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7179.jpg', title: '10' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7077.jpg', title: '11' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_7065.jpg', title: '12' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6940.jpg', title: '13' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6936.jpg', title: '14' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6879.jpg', title: '15' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6858%20(1).jpg', title: '16' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6823.jpg', title: '17' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6631.jpg', title: '18' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6625%20(1).jpg', title: '19' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6622.jpg', title: '20' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6402%20(5).jpg', title: '21' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_6066%20(4).jpg', title: '22' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_5180.jpg', title: '23' },
        { img: 'https://dogcathotel.com/Media/dogcathotel/Hotel/IMG_4693.jpg', title: '24' },
        // Add more photos as needed
      ];
  return (
    
    <Box sx={{ padding: '20px 250px'}}>
        <Typography variant='h4'>
            PhotoGallery
        </Typography>
        <ImageList variant="masonry" cols={3} gap={12}>
        {photos.map((photo, index) => (
            <ImageListItem key={index} sx={{transition:'transform 0.3s ease-in-out', '&:hover':{transform: 'scale(1.03)'}}}>
            <img
                src={photo.img}
                alt={photo.title}
                loading="lazy"
                style={{ borderRadius: '10px' }}
            />
            </ImageListItem>
        ))}
        </ImageList>
    </Box>
  )
}

export default PhotoGallery