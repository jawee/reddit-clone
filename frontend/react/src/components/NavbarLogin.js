import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as Constants from '../utilities/constants';


function NavbarLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {

    var tokenIsSet = localStorage.getItem(Constants.AUTH_TOKEN_NAME) !== null ? true : false;
    setIsLoggedIn(tokenIsSet);

  }, [localStorage.getItem(Constants.AUTH_TOKEN_NAME)]);

  if (isLoggedIn) {
    return (<div>Hello, Username</div>);
  } else {
    return (
      <NavLink to="/login" className="nav-link">Login</NavLink>
    );
  }
}

export default NavbarLogin;
