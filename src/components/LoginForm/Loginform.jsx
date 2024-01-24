import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginForm.css'
import * as authService from '../../services/authService'

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

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="container">
      <div className="inputContainer">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="button">Log In</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default Loginform;