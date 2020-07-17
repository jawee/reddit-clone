import React, { useEffect, useState } from 'react';
import { useParams }  from 'react-router-dom';
import Thread from './Thread';
import * as Constants from '../utilities/constants';

function Subreddit() {
  let { subredditUrl } = useParams();
  const [subreddit, setSubreddit] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(Constants.BASE_URL + Constants.API_URL + Constants.SUBREDDIT_URL_ENDPOINT + '/' + subredditUrl).then(res => res.json()).then((result) => {
      setSubreddit(result);
      setIsLoaded(true);
    }, (error) => {
      console.log(error);
    });
  }, [subredditUrl]);

  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="container">
        <SubredditInternal subreddit={subreddit} />
      </div>
    );
  }
}

export default Subreddit;

function SubredditInternal({ subreddit }) { 
  return (
    <div>
      <h1>{subreddit.name}</h1>
      {subreddit.threads.map((thread, i) => {
        return (
          <Thread key={thread.$oid} threadId={thread} />
        );
      })}
    </div>

  );
}
