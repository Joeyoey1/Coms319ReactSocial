import React from 'react';
import errorPhoto from './404.jfif';
import ReactDOM from "react-dom";
import './App.css';

export default class Post extends React.Component 
{
  
  state = {
    Title: "Title not found",
    Photo: errorPhoto,
    Likes: 0
  }
  dislike = () => {
    this.setState({ Likes: this.state.Likes - 1 });
  }
  like = () => {
    this.setState({ Likes: this.state.Likes + 1 });
  }
  comment = () => {

  }
  render()  
  {
    return (
      <div className="Post">
        <header className="Post-header">
          <p>
          {this.state.Title}
          </p>
          <img src= {this.state.Photo} className="Post-logo" alt="Photo" />
          
          <p> <button onClick={this.like}>Upvote</button>  {this.state.Likes}  <button onClick={this.dislike}>Downvote</button></p>
           <p><input 
          
          className = "commentBox"
          placeholder = "Make your comment here!"
          value={this.state.comment}>

          </input>   <button onClick={this.comment}>Comment</button></p>
        </header>
      </div>
    );
  }
}
