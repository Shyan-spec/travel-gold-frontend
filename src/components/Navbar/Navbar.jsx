import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className={styles.title}>Travel Gold
      </NavLink>
      <ul>
        <li><NavLink to="/signup" className={styles.active}>Sign Up</NavLink></li>
        <li><NavLink to="/login" className={styles.active}>Login</NavLink></li>
      </ul>
    </nav>
  );
};