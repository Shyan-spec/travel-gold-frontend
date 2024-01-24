import Loginform from '../../components/LoginForm/Loginform'
import './Login.css'
import { useState } from 'react'

const Login = (props) => {
  const [message, setMessage] = useState('');

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <main>
      <h3 className="login-title">Login</h3>
      <div className="login-message">{message}</div>
      <Loginform {...props} updateMessage={updateMessage} />
    </main>
  );
};

export default Login;
