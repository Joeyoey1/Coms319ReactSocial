import React from "react";

export default class ViewPosts extends React.Component {


    state = {
        loaded: false,
        posts: "",
        error: false
    }


    renderError() {
        if (this.state.error) {
            return (
                <div id="creation error">
                    <span className="error text-danger">Error loading posts! Please retry or contact support!</span>
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

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        if (!this.state.loaded) {
            fetch('http://localhost:8080/posts/')
                .then((response) => response.json())
                .then((data) => {
                    this.change("posts", data);
                    this.change("loaded", true);
                })
                .catch(() => {
                    this.change("error", true);
                });
        }
    }

    renderPosts() {
        if (this.state.loaded) {
            if (typeof this.state.posts !== "string") {
                var posts = this.state.posts.map((post, i) => {
                    return (
                        <div className="card my-2" key={i}>
                            <div className="card-header">
                                <h2>{post.title}</h2>
                            </div>
                            <div className="card-body">
                                <p>{post.content}</p>
                                <div className="d-flex justify-content-between">
                                    <a className="mt-2" href="/#"
                                       onClick={() => this.props.userClick(post.author.username)}>{post.author.displayName}</a>
                                    <div className="align-self-end ml-auto">
                                        <button className="btn btn-primary" href="/#"
                                                onClick={() => this.props.postView(post.id)}>View Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
                return posts;
            }
        }
    }

    render() {
        return (
            <div>
                <div className="mx-auto col-sm-6">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }

}