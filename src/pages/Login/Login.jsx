import Loginform from '../../components/LoginForm/Loginform'
import styles from './Login.module.css'
import { useState } from 'react'

const Login = (props) => {
  const [message, setMessage] = useState('');

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <>
      <h3 className={styles.loginTitle}></h3>
      <div className={styles.loginMessage}>{message}</div>
      <Loginform {...props} updateMessage={updateMessage} />
    </>
  );
};

export default Login;
