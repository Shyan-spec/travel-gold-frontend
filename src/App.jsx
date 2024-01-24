// src/App.jsx

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../src/components/Navbar/Navbar';
import Login from '../src/pages/Login/Login';
import Landing from './pages/Landing/LandingPage';
import Signup from './pages/Signup/Signup';
import * as authService from './services/authService';
import { useState } from 'react';
import CreateItinerary from './pages/CreateItinerary/CreateItinerary';
import SearchPage from './pages/SearchPage/SearchPage';
import MyItinerariesPage from './pages/MyItinerariesPage/MyItinerariesPage'; 

function App() {
  const [user, setUser] = useState(authService.getUser());

  function handleSignupOrLogin() {
    setUser(authService.getUser());
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing handleSignupOrLogin={handleSignupOrLogin}/>} />
        <Route path="/createitinerary" element={<CreateItinerary />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/itineraries" element={<MyItinerariesPage />} /> {/* Add route for MyItinerariesPage */}
      </Routes>
    </div>
  );
}

export default App;
