// src/App.jsx

import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/LandingPage';
import * as authService from './services/authService';
import { useState } from 'react';
import CreateItinerary from './pages/CreateItinerary/CreateItinerary';
import SearchPage from './pages/SearchPage/SearchPage';
import MyItinerariesPage from './pages/MyItinerariesPage/MyItinerariesPage'; 
import ItineraryDetailsPage from './pages/ ItineraryDetailsPage/ItineraryDetailsPage';
import './App.css'


function App() {
  const [user, setUser] = useState(authService.getUser());

  function handleSignupOrLogin() {
    setUser(authService.getUser());
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing handleSignupOrLogin={handleSignupOrLogin}/>} />
        <Route path="/createitinerary" element={<CreateItinerary handleSignupOrLogin={handleSignupOrLogin}/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/itineraries" element={<MyItinerariesPage/>} /> 
        <Route path="/itineraries/:itinerary" element={<ItineraryDetailsPage/>}/>
        <Route path="/logout" />
    </Routes>
   </div>
  );
}

export default App;
