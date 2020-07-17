import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function NavbarLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  localStorage.setItem("test", "test");
  if (isLoggedIn) {
    return (<div>Hello, Username</div>);
  } else {
    return (
      <NavLink to="/login" className="nav-link">Login</NavLink>
    );
  }
}

export default NavbarLogin;
