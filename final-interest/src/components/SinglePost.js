import React from "react";

export default class SinglePost extends React.Component {


    state = {
        loaded: false,
        post: "",
        error: false,
        comment: ""
    }


    onSubmit() {
        if (this.state.loaded) {
            this.change("loaded", false);
            const data = {author: null, content: this.state.comment};
            fetch('http://localhost:8080/post/comment/' + this.props.postId + "/" + this.props.user.id, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.change("post", data);
                    this.change("loaded", true);
                })
                .catch(() => {
                    this.change("error", true);
                });
            this.setState({
                comment: ""
            })
        }
    }


    renderError() {
        if (this.state.error) {
            return (
                <div id="creation error">
                    <span className="error text-danger">Error loading post! Please retry or contact support!</span>
                    <br/>
                </div>
            );
        }
    }

    change = (variable, value) => {
        this.setState({
            [variable]: value
        });
    };

    changeE = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        this.getPost();
    }

    getPost() {
        if (!this.state.loaded) {
            fetch('http://localhost:8080/post/' + this.props.postId, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    this.change("post", data);
                    this.change("loaded", true);
                })
                .catch(() => {
                    this.change("error", true);
                });
        }
    }

    renderReplies() {
        if (this.state.loaded) {
            if (typeof this.state.post.comments !== "string") {
                var posts = this.state.post.comments.map((comment, i) => {
                    return (
                        <div className="card my-2" key={i}>
                            <div className="card-header">
                                <h6>{comment.author.displayName}</h6>
                            </div>
                            <div className="card-body">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    );
                });
                return posts;
            }
        }
    }

    handleLike() {
        if (this.state.loaded) {
            this.change("loaded", false);
            fetch('http://localhost:8080/post/like/' + this.props.postId + "/" + this.props.user.id)
                .then((response) => response.json())
                .then((data) => {
                    this.change("post", data);
                    this.change("loaded", true);
                })
                .catch(() => {
                    this.change("error", true);
                });
        }
    }

    handleDisLike() {
        if (this.state.loaded) {
            this.change("loaded", false);
            fetch('http://localhost:8080/post/dislike/' + this.props.postId + "/" + this.props.user.id)
                .then((response) => response.json())
                .then((data) => {
                    this.change("post", data);
                    this.change("loaded", true);
                })
                .catch(() => {
                    this.change("error", true);
                });
        }
    }


    renderLikeDislike() {
        if (this.props.logged) {
            return (
                <div className="ml-5">
                    <button className="dislike mx-auto" onClick={() => this.handleDisLike()}>
                        <i className="fa fa-thumbs-down"
                           aria-hidden="true">Dislike {this.state.post.dislikes.length}</i>
                    </button>
                    <button className="like mx-auto" onClick={() => this.handleLike()}>
                        <i className="fa fa-thumbs-up" aria-hidden="true">Like {this.state.post.likes.length}</i>
                    </button>
                </div>
            );
        }
    }

    renderPost() {
        if (this.state.loaded) {
            return (
                <div className="card my-2">
                    <div className="card-header">
                        <h2>{this.state.post.title}</h2>
                    </div>
                    <div className="card-body">
                        <p>{this.state.post.content}</p>
                        <a href="/#"
                           onClick={() => this.props.userClick(this.state.post.author.username)}>{this.state.post.author.displayName}</a>
                        {this.renderLikeDislike()}
                    </div>
                </div>
            );
        }
    }

    renderCommentBox() {
        if (this.props.logged) {
            return (
                <div className="card-body my-2 my-lg-0">
                    <textarea className="form-control my-2 mr-lg-2" name="comment" placeholder="Content"
                              value={this.state.comment} onChange={event => this.changeE(event)}/>
                    <button className="btn btn-outline-primary my-2 my-sm-2" type="submit"
                            onClick={event => this.onSubmit(event)}>Post Comment
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="mx-auto col-sm-6">
                    {this.renderError()}
                    {this.renderPost()}
                    {this.renderCommentBox()}
                    <div className="container">
                        Comments
                        {this.renderReplies()}
                    </div>
                </div>
            </div>
        );
    }

}