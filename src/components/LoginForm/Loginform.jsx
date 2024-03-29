import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'
import styles from './LoginForm.module.css'
import Logo from '../../assets/Logo.png'

const Loginform = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(formData);
      props.handleSignupOrLogin();
      navigate('/search'); // Redirect to the search page
    } catch (err) {
      props.updateMessage(err.message);
    }
  };


  const handleRefresh = () => {
    window.location.reload();
  }


  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={styles.container}>
      <img src={Logo} className={styles.Loogo}/>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>
  <div className={styles.buttonContainer}>
  <button className={styles.loginButton}>Log In</button>
  <Link to="/">
    <button className={styles.cancelButton}onClick={handleRefresh}   >Cancel</button>
  </Link>
</div>
    </form>
  );
};

export default Loginform;