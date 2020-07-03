import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import SubredditList from './subreddit-list';

export default class Navbar extends React.Component {
  render() {

    return (
      <HashRouter>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Reddit Clone</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Subreddits</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </HashRouter>
    );
  }
}
