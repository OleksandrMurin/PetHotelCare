import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button, IconButton, Icon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function AboutUsEmployees() {
    const ITEMS_PER_PAGE = 3;
    const staffMembers = [
        { name: 'John Doe', position: 'Manager', image: 'https://t3.ftcdn.net/jpg/05/06/51/46/360_F_506514612_z8oBdrajxk5eE9WlDKjliXOp3k6XqTf7.jpg', description: 'John is a dedicated manager with over 10 years of experience in managing pet hotels. He ensures that everything runs smoothly and that all pets receive the best care possible.' },
        { name: 'Jane White', position: 'Veterinarian', image: 'https://todaysveterinarybusiness.com/wp-content/uploads/sites/2/2024/01/Viewpoint-2-0224.jpg', description: 'Jane is a skilled veterinarian who specializes in the health and well-being of pets. She provides regular checkups and medical care to ensure every pet is healthy and happy.' },
        { name: 'Sara Wilson', position: 'Groomer', image: 'https://blog.groomit.me/wp-content/uploads/2021/08/groomer-2.png', description: 'Sara is a professional groomer with a passion for making pets look their best. She offers a range of grooming services including bathing, haircuts, and nail trimming.' },
        { name: 'Mikola Stepanchuk', position: 'Dog Trainer', image: 'https://petkeen.com/wp-content/uploads/2021/12/Police-dog-trainer-and-trainee_dimitrivetsikas1969_Pixabay.jpg', description: 'Mikola is an experienced dog trainer who helps pets learn basic commands and proper behavior. His training sessions are fun and effective for both pets and their owners.' },
        { name: 'Bogdan Obolonsky', position: 'Pet Sitter', image: 'https://images.airtasker.com/v7/https://airtasker-seo-assets-prod.s3.amazonaws.com/en_AU/1655786776143_shutterstock_499979860.jpg?gravity=smart&w=1200&h=1200', description: 'Bogdan is a compassionate pet sitter who ensures that all pets are well taken care of during their stay. He provides them with plenty of attention, playtime, and love.' },
        { name: 'Vasil Motrichenko', position: 'Receptionist', image: 'https://www.northwoodtech.edu/sites/default/files/HealthRep_Web_%281337067405%29_880x560_FY23.png', description: 'Vasil is the friendly face you see when you first enter our pet hotel. He assists with bookings, answers questions, and makes sure that both pets and owners feel welcome.' }
    ];
    const [moreInfo, setMoreInfo] = useState(Array(staffMembers.length + 1).fill(false));
    const toggleMoreInfo = (index) =>{
        setMoreInfo(prevState=> {
            const newState = [...prevState]
            newState[index] = !newState[index]
            return newState
        })
    }
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(staffMembers.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const selectedMembers = staffMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return (
        <Box sx={{ padding: '20px 250px'}}>
            <Typography variant='h4'  sx={{paddingBottom: '20px' }}>
                Our Employees
            </Typography>
            <Box sx={{ display: 'flex', alignItems:'center'}}>
                <IconButton onClick={handlePrevPage} sx={{ height:'50px', width:'50px' }}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Box sx={{display: 'flex', gap: 2 , flex: '1 1 80%' }}>
                {selectedMembers.map((member, index) => (
                    <Card key={index} sx={{ flex: '1 1 30%' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar src={member.image} sx={{ width: 200, height: 200, mb: 2 }} />
                        <Typography variant="h6">
                            {member.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {member.position}
                        </Typography>
                        {moreInfo[index]&&
                        <Typography variant="body1" color="textSecondary" sx={{paddingBottom: '20px' }}>
                            {member.description}
                        </Typography>}
                        <Button variant = 'outlined' size = 'small' color = 'primary' onClick={() => toggleMoreInfo(index)}>{moreInfo[index] ? 'Less' : 'More'}</Button>
                        </CardContent>
                    </Card>
                ))}
                </Box>
                <IconButton onClick={handleNextPage} sx={{height:'50px', width:'50px'  }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Typography align='center' variant='h5' sx={{paddingTop: '20px' }}>
                Current page: {currentPage}
            </Typography>
        </Box>
    
      );
}

export default AboutUsEmployees