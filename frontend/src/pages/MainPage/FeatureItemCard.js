import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import { Box } from '@mui/material';

function FeatureItemCard({icon, title, description}) {
  return (
    <Card variant='outlined' sx={{padding: "10px", display: 'flex', alignItems: 'center', justifyContent:'center', bgcolor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.2s, transform 0.1s', '&:hover':{transform: 'scale(1.05)', backgroundColor: '#DEDEDE' }}}>
        <Icon sx={{flex: '1 1 10%', display: 'flex',  alignItems: 'center', justifyContent:'center' }}>
            {icon}
        </Icon>
        <CardContent sx={{ flex: '1 1 90%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant='h5' color={'black'}>{title}</Typography>
            <Typography variant='body2'>{description}</Typography>
        </CardContent>
    </Card>
  )
}

export default FeatureItemCard