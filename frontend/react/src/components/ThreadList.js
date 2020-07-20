import React, { useState, useEffect } from 'react';
import * as Constants from '../utilities/constants';
import { NavLink } from 'react-router-dom';
import * as Actions from '../utilities/actions';

function ThreadList({threadId}) {
  const [thread, setThread] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
   Actions.fetchResource(Constants.THREAD_ENDPOINT, threadId) 
      .then((result) => {
        setThread(result);
        setIsLoaded(true);
      }
        ,(error) => {
          console.log(error);
        });
  }, [threadId]);

  
  const url = "thread/" + threadId;
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
  return (
    <div>
      <h2><NavLink to={url}>{thread.title}</NavLink></h2>
      <p>{thread.content}</p>
    </div>
  );
  }
}

export default ThreadList;
