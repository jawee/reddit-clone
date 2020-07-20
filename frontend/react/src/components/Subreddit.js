import React, { useEffect, useState } from 'react';
import { useParams }  from 'react-router-dom';
import ThreadList from './ThreadList';
import * as Constants from '../utilities/constants';
import '../utilities/actions';

function Subreddit() {
  let { subredditUrl } = useParams();
  const [subreddit, setSubreddit] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchResource(Constants.SUBREDDIT_URL_ENDPOINT, subredditUrl)
      .then((result) => {
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
          <ThreadList key={thread.$oid} threadId={thread.$oid} />
        );
      })}
    </div>

  );
}
