import React from 'react';
import { useParams }  from 'react-router-dom';
import subreddits from './../data/subreddits';
import Thread from './Thread';

function findSubredditFromUrl(url) {
  let subredditObj = null;
  subreddits.map((subreddit, i) => {
    if(subreddit.url === url) {
      subredditObj = subreddit;
    }
  });

  return subredditObj;
}


function Subreddit() {
  let { subredditUrl } = useParams();
  let subreddit = findSubredditFromUrl(subredditUrl);
  return (
    <div className="container">
      <SubredditInternal subreddit={subreddit} />
    </div>
  );
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
