// RoomList.js
import React, { useState } from 'react';
import { Box, Pagination, Button } from '@mui/material';
import RoomCard from '../OurRooms/RoomCard';


const RoomList = ({ roomsData, selectedRoom, handleSelectRoom, handleCancelSelect }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  
  const handleChangePage = (event, value) => {
    setPage(value);
  }

  const displayedRooms = selectedRoom 
    ? roomsData.filter(room => room.id === selectedRoom) 
    : roomsData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {displayedRooms.map((room) => (
          <RoomCard 
            key={room.id} 
            room={room} 
            bookingSelect 
            isSelected={room.id === selectedRoom} 
            handleSelectRoom={handleSelectRoom} 
            handleCancelSelect={handleCancelSelect} 
          />
        ))}
      </Box>
      {!selectedRoom && (
        <Pagination
          count={Math.ceil(roomsData.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{ alignSelf: 'center', mt: 2 }}
        />
      )}
    </Box>
  );
};


export default RoomList;