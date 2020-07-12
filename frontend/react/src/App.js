import React from 'react';
import SubredditList from './components/subreddit-list';
import Navbar from './components/navbar';
import Home from './components/home';
import Subreddit from './components/subreddit';
import { Route, HashRouter} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/subreddits" component={SubredditList}/>
          <Route path="/subreddit/:subredditUrl"><Subreddit /></Route>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
