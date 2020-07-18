import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Constants from '../utilities/constants';

function Thread() {
  let { subredditUrl, threadId } = useParams();
  const [thread, setThread] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    fetch(Constants.BASE_URL + Constants.API_URL + Constants.THREAD_ENDPOINT + '/' + threadId)
      .then(res => res.json())
      .then((result) => {
        setThread(result);
        setIsLoaded(true);
      }, (error) => {
        console.log(error);
      });
  }, [threadId]);

  if(!isLoaded) {

    return <div>Loading...</div>;
  } else {
    console.log(thread);
    let created_at = new Date(thread.created_at.$date);
    return (
      <div>
        <h1>{thread.title}</h1>
        <span className="meta-data">Created {created_at.toLocaleString()} by {thread.created_by.$oid}</span>
        <p>{thread.content}</p>
        <h4>Comments</h4>
        {thread.comments.map((commentId, i) => {
          return <Comment key={commentId.$oid} commentId={commentId.$oid} />
        })}
      </div>
    );
  }
}

export default Thread;


function Comment({ commentId }) {
  const [comment, setComment] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(Constants.BASE_URL + Constants.API_URL + Constants.COMMENT_ENDPOINT + '/' + commentId)
      .then(res => res.json())
      .then((result) => {
        setComment(result);
        setIsLoaded(true);
      }, (error) => {
        console.log(error);
      });
  }, [commentId]);

  console.log(comment);
  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    let created_at = new Date(comment.created_at.$date);
    return (
      <div>
        <p>{comment.content}</p>
        <span className="meta-data">Created {created_at.toLocaleString()} by {comment.created_by.$oid}</span>
      </div>
    );
  }
}
