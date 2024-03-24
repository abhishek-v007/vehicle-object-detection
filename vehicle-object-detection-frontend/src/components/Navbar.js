import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          Image Object Detection
        </a>
      </div>
    </nav>
  );
};

export default Navbar;