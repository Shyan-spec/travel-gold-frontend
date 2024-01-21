import React from 'react'
import { Link } from "react-router-dom"

export const Navbar = () => {
  return <nav>
    <Link to="/">Website</Link>
    <ul>
        <li><Link to ="/createaccount">Create Account</Link></li>
        <li><Link to ="/login">Login</Link></li>
    </ul>


  </nav>;

}
