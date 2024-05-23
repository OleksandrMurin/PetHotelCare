import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/MainPage/HomePage';
import OurRooms
import AboutUs from './pages/AboutUs';
import Booking from './pages/Booking';
import Account from './pages/Account';
import AdminPage from './pages/AdminPage';
import ManagePets from './pages/ManagePets';
import ManageUsers from './pages/ManageUsers';
import ManageServices from './pages/ManageServices';
import ManageProducts from './pages/ManageProducts';
import ManageRooms from './pages/ManageRooms';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<OurRooms />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/manage-pets" element={<ManagePets />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-services" element={<ManageServices />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />
          <Route path="/admin/manage-rooms" element={<ManageRooms />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;