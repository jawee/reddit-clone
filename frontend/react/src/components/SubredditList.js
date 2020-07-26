import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreateSubredditForm from './CreateSubredditForm';
import * as Constants from '../utilities/constants';
import * as Actions from '../utilities/actions';

function SubredditList() {
  const [subreddits, setSubreddits] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  let token = localStorage.getItem(Constants.AUTH_TOKEN_NAME);
  let tokenIsSet = token ? true : false;
  let isLoggedIn = tokenIsSet;

  useEffect(() => {
    Actions.fetchResource(Constants.SUBREDDIT_ENDPOINT)
      .then((result) => {
        setSubreddits(result);
        setIsLoaded(true);
      }
        ,(error) => {
          console.log(error);
        });
  }, []);
  console.log(isLoggedIn);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul>
          {subreddits.map((subreddit, i) => {
            return (<SubredditListListItem key={subreddit.name} subreddit={subreddit} />)
          })}
        </ul>
        {isLoggedIn && <CreateSubredditForm />}
      </div>
    );
  }

}

function SubredditListListItem({ subreddit }) {
  const url = "/subreddit/" + subreddit.url + '/';
  return (
    <li><NavLink to={url}>{subreddit.name}</NavLink></li>
  );

}
export default SubredditList;
