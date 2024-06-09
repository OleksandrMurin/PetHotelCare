import React, { useContext } from 'react';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import SignIn from '../pages/Account/SignIn';
import SignUp from '../pages/Account/SignUp';
import AuthContext from '../contexts/AuthProvider';

const AuthDialog = ({ open, onClose, type }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    onClose();
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {type === 'signIn' ? (
          <SignIn onSwitchToSignUp={() => onClose('signUp')} handleAuthorized={onClose} />
        ) : (
          <SignUp onSwitchToSignIn={() => onClose('signIn')} handleAuthorized={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
