import React from 'react';
import {
  NavLink,
  HashRouter
} from "react-router-dom";
import NavbarLogin from './NavbarLogin';

function Navbar() {
  return (
    <HashRouter>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Reddit Clone</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <NavLink to="/subreddits" className="nav-link">Subreddits</NavLink>
              </li>
            </ul>
            <span className="ml-auto nav-item">
              <NavbarLogin />
            </span>
          </div>
        </div>
      </nav>
    </HashRouter>
  );
}

export default Navbar;
