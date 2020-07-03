import React from 'react';
import SubredditList from './components/subreddit-list';
import Navbar from './components/navbar';

class App extends React.Component {
  render() {
  return (
    <div>
      <Navbar />
      <SubredditList />
    </div>
  );
  }
}

export default App;
