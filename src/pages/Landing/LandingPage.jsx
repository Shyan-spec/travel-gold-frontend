import React, { useState } from 'react';
import BgVideo from '../../media/bg.mp4';
import Login from '../Login/Login'; // Import your Login component
import Signup from '../Signup/Signup';
import styles from './Landing.module.css'

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
    <div className={styles.landingpage}>
      <video src={BgVideo} autoPlay muted loop className={`videoBg ${showLogin ? 'hideBg' : ''}`} />
      {show ? (
        showLogin ? (<Login handleSignupOrLogin={handleSignupOrLogin} />) :
        (<Signup handleSignupOrLogin={handleSignupOrLogin} />)
      ) : (
        <div className={styles.bgOverlay}>
          <div className={styles.homeText}>
            <h1>Travel Gold</h1>
            <p>Live out your ideal vacation!</p>
            <button onClick={handleLoginClick} className={styles.loginBtn}>
              Login
            </button>
            <button onClick={handleSignupClick} className={styles.signupBtn}>
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Landingpage;
