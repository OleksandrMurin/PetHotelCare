import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function RoomCard({ room, bookingSelect, isSelected, handleSelectRoom, handleCancelSelect }) {
  return (
    <Card sx={{ flex: '1 1 auto', maxWidth: 445, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        alt={`Room ${room.number}`}
        height="240"
        image={room.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Room {room.number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Description:</strong> {room.description}
        </Typography>
      </CardContent>
      {!bookingSelect &&
        <Button align='right' variant="outlined" size="small" color="primary" sx={{ margin: "20px 20px" }}>More</Button>
      }
      {bookingSelect && !isSelected &&
        <Button align='right' variant="outlined" size="small" color="primary" sx={{ margin: "20px 20px" }} onClick={() => handleSelectRoom(room.id)}>Select</Button>
      }
      {bookingSelect && isSelected &&
        <Button align='right' variant="outlined" size="small" color="secondary" sx={{ margin: "20px 20px" }} onClick={handleCancelSelect}>Cancel</Button>
      }
    </Card>
  );
}
export default RoomCard