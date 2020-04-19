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
        console.log(this.state.posts);
    }

    getPosts() {
        if (!this.state.loaded) {
            let errorMaybe = false;
            fetch('http://localhost:8080/posts/')
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    this.change("posts", data);
                })
                .catch((error) => {
                    errorMaybe = true;
                });
            this.setState({
                loaded: true,
                error: errorMaybe
            });
        }
    }

    renderPosts() {
        if (this.state.loaded) {
            if (typeof this.state.posts !== "string") {
                var posts = this.state.posts.map((post, i) => {
                    return (
                        <div className="card" key={i}>
                            <div className="card-header">
                                {post.title}
                            </div>
                            <div className="card-body">
                                <p>{post.content}</p>
                                <a href="/#">{post.author.displayName}</a>
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