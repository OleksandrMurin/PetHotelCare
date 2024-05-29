// RoomList.js
import React, { useState } from 'react';
import { Box, Pagination, Grid, Button } from '@mui/material';
import RoomCard from '../OurRooms/RoomCard';


const roomsData = [
  { id: 1, name: 'Room 1', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
  { id: 2, name: 'Room 2', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
  { id: 3, name: 'Room 1', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
  { id: 4, name: 'Room 2', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
  { id: 5, name: 'Room 1', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
  { id: 6, name: 'Room 2', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
  { id: 7, name: 'Room 1', image: '/images/room1.jpg', description: 'Cozy room for your pet', pricePerDay: 50 },
  { id: 8, name: 'Room 2', image: '/images/room2.jpg', description: 'Spacious room with a view', pricePerDay: 75 },
  // Добавьте больше данных по аналогии
];

const RoomList = ({ roomsData, selectedRoom, handleSelectRoom, handleCancelSelect }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  
  const handleChangePage = (event, value) => {
    setPage(value);
  }
  
  const displayedRooms = selectedRoom ? roomsData.filter(room => room.id === selectedRoom) : roomsData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{display: 'flex', justifyContent:'center', gap: 2}}>
        {displayedRooms.map((room) => (
            <RoomCard key={room.id} room={room} bookingSelect isSelected={room.id===selectedRoom} handleSelectRoom={handleSelectRoom} handleCancelSelect={handleCancelSelect}/>
        ))}
      </Box>
      {!selectedRoom&&<Pagination
        count={Math.ceil(roomsData.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ alignSelf: 'center', mt: 2 }}
      />}
        
    </Box>
  );
};

export default RoomList;
