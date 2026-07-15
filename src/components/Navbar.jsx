import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="site-nav">
      <div className="container site-nav__inner">
        <Link to="/" className="logo">
          ZER<span className="text-accent">0</span>BLINK
        </Link>
        <Link to="/archives" className="site-nav__link">Archives <span aria-hidden="true">↗</span></Link>
      </div>
    </nav>
  );
};

export default Navbar;
