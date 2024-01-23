import React from 'react';
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
        <li><NavLink to="/createaccount" activeClassName="active">Create Account</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
      </ul>
    </nav>
  );
};
