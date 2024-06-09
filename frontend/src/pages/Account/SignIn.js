import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import AuthContext from '../../contexts/AuthProvider';

function SignIn ({ onSwitchToSignUp, handleAuthorized }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext)
  const handleLocalSignIn = () => {
    login(email, password)
    handleAuthorized()
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, maxHeight:'350px', margin: '0 auto', marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
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
      <Box sx={{paddingTop:'30px'}}>
        <Button variant="contained" color="primary" onClick={handleLocalSignIn} fullWidth >
          Sign In
        </Button>
      </Box>
      
      <Box mt={2} textAlign="center">
        <Button onClick={onSwitchToSignUp}>Don't have an account? Sign Up</Button>
      </Box>
    </Paper>
  );
};

export default SignIn;
