import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/MainPage/HomePage';
import OurRooms from './pages/OurRooms/OurRooms';
import AboutUs from './pages/AboutUs/AboutUs';
import Booking from './pages/Booking/Booking';
import Account from './pages/Account/Account';
import AdminPage from './pages/AdminPage/AdminPage';
import theme from './components/theme';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from './pages/Account/SignIn';
import SignUp from './pages/Account/SignUp';
import OurServices from './pages/OurServices/OurServices';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<OurRooms />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;