import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import AuthContext from '../../contexts/AuthProvider';

function SignUp({ onSwitchToSignIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {register} = useContext(AuthContext)
  const handleSignUp = () => {
    register(name, email, password, confirmPassword)
    
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, maxHeight:'500px', margin: '0 auto', marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Your name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{paddingTop:'30px'}}>
        <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
          Sign Up
        </Button>
      </Box>
      
      <Box mt={2} textAlign="center">
        <Button onClick={onSwitchToSignIn}>Already have an account? Sign In</Button>
      </Box>
    </Paper>
  );
}

export default SignUp