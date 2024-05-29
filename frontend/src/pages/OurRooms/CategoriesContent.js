import { Box, Typography } from '@mui/material'
import React from 'react'
import RoomCard from './RoomCard'

function CategoriesContent({category, rooms}) {
  return (
    <Box sx={{padding: "20px"}}>
        <Typography variant="h4" align="center" gutterBottom>
            {category.name}
        </Typography>
        <Box sx={{gap: 5, display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent:"center", alignItems:"center", padding: "20px"}}>
            {rooms.map((room, index) => (
                <RoomCard  key={index} room ={room}/>
            ))}
        </Box>
    </Box>
  )
}

export default CategoriesContent