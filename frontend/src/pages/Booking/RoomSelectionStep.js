import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Button, Typography, FormControl, InputLabel, TextField } from '@mui/material';
import RoomList from './RoomList';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import axios from 'axios';

const RoomSelectionStep = ({ onNext, onPrev, roomsData, roomSelection }) => {
  const [dateRange, setDateRange] = useState(roomSelection.dateRange || [null, null]);
  const [roomCategory, setRoomCategory] = useState(roomSelection.roomCategory || '');
  const [selectedRoom, setSelectedRoom] = useState(roomSelection.selectedRoom || null);
  const [showRooms, setShowRooms] = useState(!!selectedRoom);
  const [roomCategories, setRoomCategories] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    setDateRange(roomSelection.dateRange || [null, null]);
    setRoomCategory(roomSelection.roomCategory || '');
    setSelectedRoom(roomSelection.selectedRoom || null);
    setShowRooms(!!roomSelection.selectedRoom);
  }, [roomSelection]);

  useEffect(() => {
    const fetchRoomCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7108/api/RoomType?page=1');
        setRoomCategories(response.data.items);
      } catch (error) {
        console.error('Error fetching room categories:', error);
      }
    };

    fetchRoomCategories();
  }, []);

  const handleSelectRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleCancelSelect = () => {
    setSelectedRoom(null);
  };

  const handleSearchRooms = async () => {
    if (dateRange[0] && dateRange[1] && roomCategory) {
      try {
        const response = await axios.get('https://localhost:7108/api/Room?page=1');
        const allRooms = response.data.items;
        const filtered = allRooms.filter(room => room.roomTypeId === roomCategory.toString());
        setFilteredRooms(filtered);
        setShowRooms(true);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
  };

  const handleNext = () => {
    onNext({ dateRange, roomCategory, selectedRoom });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '700px', gap: 2 }}>
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
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!showRooms && (
        <Button variant="contained" onClick={handleSearchRooms} sx={{ alignSelf: 'flex-end' }}>
          Search rooms
        </Button>
      )}
      {showRooms && (
        <Box>
          <Typography variant="h6" sx={{ padding: '20px' }}>Choose room for your pet</Typography>
          <RoomList
            dateRange={dateRange}
            roomCategory={roomCategory}
            onRoomSelect={handleNext}
            roomsData={filteredRooms}
            selectedRoom={selectedRoom}
            handleSelectRoom={handleSelectRoom}
            handleCancelSelect={handleCancelSelect}
          />
        </Box>
      )}

      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Button variant="contained" onClick={onPrev}>
          Previous step
        </Button>
        {dateRange[0] && dateRange[1] && selectedRoom && (<Button variant="contained" onClick={handleNext}>
          Next step
        </Button>)}
      </Box>
    </Box>
  );
};

export default RoomSelectionStep;
