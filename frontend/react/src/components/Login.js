import React, { useState, useEffect } from 'react';
import * as Actions from '../utilities/actions';
import * as Constants from '../utilities/constants';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");


  useEffect(() => {
    var tokenIsSet = localStorage.getItem(Constants.AUTH_TOKEN_NAME) !== null ? true : false;

    setIsLoggedIn(tokenIsSet);

  }, []);


  function handleSubmit(event) {
    event.preventDefault();
    console.log(email);
    console.log(password);

    Actions.fetchLogin(email, password)
      .then((result) => {

        setLoginError("");
        console.log(result);
        // DO something with token
        localStorage.setItem(Constants.AUTH_TOKEN_NAME, result.token);
        setIsLoggedIn(true);
      }).catch(err => {
        debugger;
        setLoginError(err.message);
        console.log(err); 
      });
  }

  if(isLoggedIn) {
    return (
      <div className="container">You're now logged in</div>
    );
  } else {


    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email-input" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email-input" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password-input" className="form-label">Password</label>
            <input type="password" className="form-control" id="password-input" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {loginError && <span>{loginError}</span>}
      </div>
    );
  }
}

export default Login;
