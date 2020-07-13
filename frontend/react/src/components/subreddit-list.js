import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function SubredditList() {
  const [subreddits, setSubreddits] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/subreddits').then(res => res.json()).then((result) => {
      setSubreddits(result);
      setIsLoaded(true);
    }
      , (error) => {
        console.log(error);
      });
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {subreddits.map((subreddit, i) => {
          return (<SubredditListListItem key={subreddit.name} subreddit={subreddit} />)
        })}
      </ul>
    );
  }

}

function SubredditListListItem({ subreddit }) {
  const url = "/subreddit/" + subreddit.url;
  return (
    <li><NavLink to={url}>{subreddit.name}</NavLink></li>
  );

}
export default SubredditList;
