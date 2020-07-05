import React from 'react';
import { NavLink } from 'react-router-dom';

class SubredditList extends React.Component {

  render() {
    const subreddits = [
      {
        "_id": {
          "$oid": "5ee4f687f2a019d5b1f6e535"
        },
        "name": "WEC",
        "url": "wec",
        "created_by": {
          "$oid": "5ee4f678f2a019d5b1f6e534"
        },
        "threads": [
          {
            "$oid": "5ee4f6ef04d091af0994789f"
          }
        ]
      },
      {
        "_id": {
          "$oid": "5eff4fb1cac303868aef1ba9"
        },
        "name": "Formula 1",
        "url": "formula1",
        "created_by": {
          "$oid": "5ee4f678f2a019d5b1f6e534"
        },
        "threads": []
      }
    ];
    return (
      <ul>
        {subreddits.map((subreddit, i) => {
          return (<SubredditListListItem key={subreddit.name} subreddit={subreddit} />)
        })}
      </ul>
    );
  }
}

class SubredditListListItem extends React.Component {
  render() {
    const url = "/subreddit/" + this.props.subreddit.url;
    return (
      <li><NavLink to={url}>{this.props.subreddit.name}</NavLink></li>
    );
  }
}
export default  SubredditList;
