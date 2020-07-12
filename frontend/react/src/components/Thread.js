import React from 'react';
import threads from '../data/threads';

function Thread({threadId}) {
  let thread = findThreadById(threadId);
  return (
    <div>
      <h2>{thread.title}</h2>
      <p>{thread.content}</p>
    </div>
  )
}

export default Thread;

function findThreadById(threadId) {
  let thread = threads.find(thread => thread._id.$oid === threadId.$oid);
  return thread;
}
