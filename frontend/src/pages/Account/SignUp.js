import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

function SignUp({ onSwitchToSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Add your sign-up logic here
    console.log('Sign up', { email, password, confirmPassword });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, maxHeight:'450px', margin: '0 auto', marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
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