import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className="title">Travel Gold
      </NavLink>
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
  );
};