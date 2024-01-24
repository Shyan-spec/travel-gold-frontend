// src/App.jsx

import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/LandingPage';
import * as authService from './services/authService';
import { useState } from 'react';
import CreateItinerary from './pages/CreateItinerary/CreateItinerary';
import SearchPage from './pages/SearchPage/SearchPage';
import MyItinerariesPage from './pages/MyItinerariesPage/MyItinerariesPage'; 
import styles from './App.module.css'


function App() {
  const [user, setUser] = useState(authService.getUser());

  function handleSignupOrLogin() {
    setUser(authService.getUser());
  }

  return (
    <div className={styles.App}>
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
