import React, { useState } from 'react';
import BgVideo from '../../media/bg.mp4';
import './Landing.css';
import Login from '../Login/Login'; // Import your Login component
import Signup from '../Signup/Signup';

const Landingpage = ({handleSignupOrLogin}) => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);


  const handleLoginClick = () => {
    setShow(true);
    setShowLogin(true)
  };

  const handleSignupClick = () => {
    setShow(true);
    setShowSignup(true)
  };

  return (
    <div className="landingpage">
      <video src={BgVideo} autoPlay muted loop className={`video-bg ${showLogin ? 'hide-bg' : ''}`} />
      {show ? (
        showLogin ? (<Login handleSignupOrLogin={handleSignupOrLogin} />) :
        (<Signup handleSignupOrLogin={handleSignupOrLogin} />)
      ) : (
        <div className="bg-overlay">
          <div className="home-text">
            <h1>Travel Gold</h1>
            <p>Live out your ideal vacation!</p>
            <button onClick={handleLoginClick} className="login-btn">
              Login
            </button>
            <button onClick={handleSignupClick} className="signup-btn">
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Landingpage;
