import React from 'react';
import SubredditList from './components/SubredditList';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Subreddit from './components/Subreddit';
import Login from './components/Login';
import { Route, HashRouter} from 'react-router-dom';
import Thread from './components/Thread';

function App() {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/subreddits" component={SubredditList}/>
          <Route path="/subreddit/:subredditUrl/thread/:threadId"><Thread /></Route>
          <Route exact path="/subreddit/:subredditUrl/"><Subreddit /></Route>
          <Route path="/login"><Login /></Route>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
