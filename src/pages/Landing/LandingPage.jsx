import React, { useState } from 'react';
import BgVideo from '../../media/bg.mp4';
import Login from '../Login/Login'; // Import your Login component
import Signup from '../Signup/Signup';
import styles from './Landing.module.css'
import Logo from '../../assets/Logo.png'

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
      <video src={BgVideo} autoPlay muted loop className={`${styles.videoBg} ${showLogin ? styles.hideBg : ''}`}  />
      {show ? (
        showLogin ? (
        <div className={styles.bgOverlay}>
          <Login handleSignupOrLogin={handleSignupOrLogin} />
        </div>
        ) :
        (
          <>
          <div className={styles.bgOverlay}>
            <Signup handleSignupOrLogin={handleSignupOrLogin} />
          </div>
          </>
          )
      ) : (
        <div className={styles.bgOverlay}>
          <img src={Logo} className={styles.Logo}/>
          <div className={styles.homeText}>
            <h1 className={styles.logoTitle}>TG</h1>
            <h2 className={styles.logosubheaderTitle}> Travel Gold </h2>
           
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
