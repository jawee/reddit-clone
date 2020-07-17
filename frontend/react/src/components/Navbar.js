import React from 'react';
import {
  NavLink,
  HashRouter
} from "react-router-dom";

function Navbar() {
  return (
    <HashRouter>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Reddit Clone</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <NavLink to="/subreddits" className="nav-link">Subreddits</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </HashRouter>
  );
}

export default Navbar;
