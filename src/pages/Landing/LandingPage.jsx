// Landing.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import BgVideo from '../../media/bg.mp4'; 
import './Landing.css';


const Landingpage = () => {
  return (
      <div className="landingpage">

          <video src={BgVideo} autoPlay muted loop className="video-bg" />
          <div className="bg-overlay"></div>

              {/* Navbar links integrated into the landing page */}
      <nav className="navbar">
        {/* <NavLink to="/" className="title">Travel Gold</NavLink> */}
        <div className="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul>
          {/* <li><NavLink to="/signup" className="active">Sign Up</NavLink></li>
          <li><NavLink to="/login" className="active">Login</NavLink></li>
          <li><NavLink to="/createitinerary" className="active">Create Itinerary</NavLink></li> */}
        </ul>
      </nav>

      <div className="home-text">
        <h1>Travel Gold</h1>
        <p>Live out your ideal vacation</p>
      </div>

      {/* Replace div elements with NavLink elements */}
      <NavLink to="/login" className="home-btn">Login</NavLink>
      <NavLink to="/signup" className="home-btn">Sign Up</NavLink>
      <NavLink to="/createitinerary" className="home-btn">Create Itinerary</NavLink>
    </div>
  );
}

export default Landingpage;