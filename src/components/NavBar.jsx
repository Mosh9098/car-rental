import { NavLink } from "react-router-dom";
import React from 'react';

const NavBar = () => {
  return (
    <header>
        <p className="logo">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQ2FbmsokMlmV4k09l30rbsXA8fvyiySJHg&usqp=CAU" 
                alt="Vismart Four Wheels Logo" 
                style={{ width: '150px' }} // Adjust size if needed
            />
        </p>
        <h1>CAR RENTAL</h1>
        <nav>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>
    </header>
  );
};

export default NavBar;
