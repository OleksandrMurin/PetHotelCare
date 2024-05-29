import React, { useState } from 'react';
import { Box, Select, MenuItem, Button, Typography, FormControl, InputLabel, TextField } from '@mui/material';

import RoomList from './RoomList';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const RoomSelectionStep = ({ onNext }) => {
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
  const [dateRange, setDateRange] = useState([null, null]);
  const [roomCategory, setRoomCategory] = useState('');
  const [showRooms, setShowRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const handleSelectRoom =(roomId) =>{
    setSelectedRoom(roomId);
  }
  const handleCancelSelect =() =>{
    setSelectedRoom(null)
  }
  
  const roomCategories = [
    { label: 'Standard', value: 'standard' },
    { label: 'Deluxe', value: 'deluxe' },
    { label: 'Suite', value: 'suite' }
  ];

  const handleSearchRooms = () => {
    if (dateRange[0] && dateRange[1] && roomCategory) {
      setShowRooms(true);
    }
  };

  const handleNext = () => {
    onNext({ dateRange, roomCategory });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" align='center'>Choose room details</Typography>
      <Typography variant="h6">Choose date range</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Start date"
          endText="End date"
          value={dateRange}
          onChange={(newValue) => setDateRange(newValue)}
          renderInput={(startProps, endProps) => (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField {...startProps} fullWidth />
              <TextField {...endProps} fullWidth />
            </Box>
          )}
        />
      </LocalizationProvider>
      <Typography variant="h6">Choose type of room you are looking for</Typography>
      <FormControl fullWidth>
        <InputLabel id="room-category-select-label">Room type</InputLabel>
        <Select
          labelId="room-category-select-label"
          value={roomCategory}
          onChange={(e) => setRoomCategory(e.target.value)}
          label="Room type"
        >
          {roomCategories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!showRooms && 
        <Button variant="contained" onClick={handleSearchRooms} sx={{ alignSelf: 'flex-end' }}>
        Search rooms
      </Button>}
      {showRooms && (
        <Box>
          <Typography variant="h6" sx={{padding: '20px'}}>Choose room for your pet</Typography>
          <RoomList
            dateRange={dateRange}
            roomCategory={roomCategory}
            onRoomSelect={handleNext}
            roomsData={roomsData}
            selectedRoom={selectedRoom}
            handleSelectRoom={handleSelectRoom}
            handleCancelSelect={handleCancelSelect}
          />
        </Box>
        
      )}
      {dateRange[0] && dateRange[1] && selectedRoom &&
      <Button variant="contained" onClick={handleNext} sx={{ alignSelf: 'flex-end' }}>
        Next step
      </Button>
      }
    </Box>
  );
};

export default RoomSelectionStep;
