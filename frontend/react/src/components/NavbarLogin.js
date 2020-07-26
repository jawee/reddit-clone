import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as Constants from '../utilities/constants';
import * as Actions from '../utilities/actions';


function NavbarLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let token = localStorage.getItem(Constants.AUTH_TOKEN_NAME);
    let tokenIsSet = token ? true : false;
    setIsLoggedIn(tokenIsSet);

    if(isLoggedIn) {
      let decodedToken = JSON.parse(atob(token.split('.')[1])); 
      setUserId(decodedToken.identity);
    }
  }, [localStorage.getItem(Constants.AUTH_TOKEN_NAME)]);

  useEffect(() => {

    if(userId === "") {
      return;
    }

    Actions.getUsernameFromId(userId)
      .then((result) => {
        setUsername(result.username);
      }, (error) => {
        console.log(error);
      });
  }, [userId]);

  if (isLoggedIn) {
    return (<div>Hello, {username}</div>);
  } else {
    return (
      <NavLink to="/login" className="nav-link">Login</NavLink>
    );
  }
}

export default NavbarLogin;
