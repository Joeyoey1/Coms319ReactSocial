import React from 'react';
import errorPhoto from './404.jfif';
import './App.css';

export default class Post extends React.Component {
  state = {
    Title: 'Title not found',
    Photo: errorPhoto,
    Likes: 0,
    comment: ''
  };

  dislike = () => {
    this.setState((prevState) => ({ Likes: prevState.Likes - 1 }));
  };

  like = () => {
    this.setState((prevState) => ({ Likes: prevState.Likes + 1 }));
  };

  updateComment = (event) => {
    this.setState({ comment: event.target.value });
  };

  comment = () => {
    // Placeholder for comment submission behavior.
  };

  render() {
    return (
      <div className="Post">
        <header className="Post-header">
          <p>{this.state.Title}</p>
          <img src={this.state.Photo} className="Post-logo" alt="Post content" />

          <p>
            {' '}
            <button onClick={this.like}>Upvote</button> {this.state.Likes}{' '}
            <button onClick={this.dislike}>Downvote</button>
          </p>
          <p>
            <input
              className="commentBox"
              placeholder="Make your comment here!"
              value={this.state.comment}
              onChange={this.updateComment}
            />{' '}
            <button onClick={this.comment}>Comment</button>
          </p>
        </header>
      </div>
    );
  }
}
