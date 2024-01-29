import styles from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

const navigate = useNavigate;

const handleLogout = () => {
  localStorage.removeItem('token');
  // Redirect to the landing page
  navigate('/');
};

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className={styles.title}>Travel Gold
      </NavLink>
      <ul>
        {/* <li><NavLink to="/signup" className={styles.active}></NavLink></li> */}
        <li><NavLink to="/search"className={styles.active}>Create Itinerary</NavLink></li>
        <li><NavLink to="/itineraries" className={styles.active}>My Itineraries</NavLink></li>
        <li><NavLink to="/" onClick={handleLogout} className={styles.active}>Logout</NavLink></li>
      
       
      </ul>
    </nav>
  );
};