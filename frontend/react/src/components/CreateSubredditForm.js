import React, { useState, useEffect } from 'react';
import * as Actions from '../utilities/actions';
import * as Constants from '../utilities/constants';

function CreateSubredditForm() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name);
    const url = Constants.BASE_URL + Constants.API_URL + Constants.SUBREDDIT_ENDPOINT;
    const token = localStorage.getItem(Constants.AUTH_TOKEN_NAME);
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({name})
    })
      .then(res => {
        if(res.ok) {
          return res;
        } else {
          throw Error('Authentication error');
        }
      })
      .then(res => res.json())
      .then((result) => {
        // do something?
        console.log(result);
        debugger;
      })
      .catch((error) => console.log(error));

  }
  return (
    <div className="container">
      <h3>Create new subreddit</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name-input" onChange={e => setName(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateSubredditForm;
