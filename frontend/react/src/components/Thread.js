import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Constants from '../utilities/constants';
import '../utilities/actions';

function Thread() {
  let { threadId } = useParams();
  const [thread, setThread] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState([]);

  useEffect(() => {

    fetchResource(Constants.THREAD_ENDPOINT, threadId)
      .then((result) => {
        setThread(result);
        setIsLoaded(true);
      }, (error) => {
        console.log(error);
      });
  }, [threadId]);


  useEffect(() => {
    if(thread.length === 0) {
      return;
    }
    getUsernameFromId(thread.created_by.$oid)
      .then((result) => {
        setUsername(result.username);
      }, (error) => {
        console.log(error);
      });
  }, [thread]);


  if(!isLoaded) {
    return <div>Loading...</div>;
  } else {
    let created_at = new Date(thread.created_at.$date);
    return (
      <div>
        <h1>{thread.title}</h1>
        <span className="meta-data">Created {created_at.toLocaleString()} by {username}</span>
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
  const [username, setUsername] = useState([]);

  useEffect(() => {
    fetchResource(Constants.COMMENT_ENDPOINT, commentId)
      .then((result) => {
        setComment(result);
        setIsLoaded(true);
      }, (error) => {
        console.log(error);
      });

  }, [commentId]);


useEffect(() => {

    if(comment.length === 0) {
      return;
    }
    getUsernameFromId(comment.created_by.$oid)
      .then((result) => {
        setUsername(result.username);
      }, (error) => {
        console.log(error);
      });
  }, [comment]);

  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    let created_at = new Date(comment.created_at.$date);
    return (
      <div>
        <p>{comment.content}</p>
        <span className="meta-data">Created {created_at.toLocaleString()} by {username}</span>
        <hr />
      </div>
    );
  }
}
