import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className="title">Travel Gold
      </NavLink>
      <ul>
        <li><NavLink to="/signup" className="active">Sign Up</NavLink></li>
        <li><NavLink to="/login" className="active">Login</NavLink></li>
      </ul>
    </nav>
  );
};