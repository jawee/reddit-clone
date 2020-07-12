import React from 'react';
import { NavLink } from 'react-router-dom';
import subreddits from './../data/subreddits';

function SubredditList() {
  return (
    <ul>
      {subreddits.map((subreddit, i) => {
        return (<SubredditListListItem key={subreddit.name} subreddit={subreddit} />)
      })}
    </ul>
  );

}

function SubredditListListItem({ subreddit }) {
  const url = "/subreddit/" + subreddit.url;
  return (
    <li><NavLink to={url}>{subreddit.name}</NavLink></li>
  );

}
export default SubredditList;
