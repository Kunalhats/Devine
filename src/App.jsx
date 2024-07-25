import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import FriendsId from './Pages/FriendsId/FriendsId';
import Notification from './Pages/Notification/Notification';
import Login from './Pages/RegisterPage/Login';
import SignUp from './Pages/RegisterPage/SignUp';
import ForgotPassword from './Pages/RegisterPage/ForgotPassword'; // Import ForgotPassword

const App = () => {
  const [friendProfile, setFriendsProfile] = useState([]);

  return (
    <MantineProvider>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />  {/* Redirect root to login */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/friendsId' element={<FriendsId friendProfile={friendProfile} />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/forgot-password' element={<ForgotPassword />} /> {/* Add route for ForgotPassword */}
        </Routes>
      </div>
    </MantineProvider>
  );
};

export default App;
