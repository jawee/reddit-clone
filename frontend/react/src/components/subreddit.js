import React from 'react';
import { useParams }  from 'react-router-dom';
import subreddits from './../data/subreddits';

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
  const subreddit_id = "5eff4fb1cac303868aef1ba9";
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
  console.log(subreddit);
  return (
    <div>
    {subreddit.name}
    {/* list threads */}
    </div>
    
  );
}
