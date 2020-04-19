import React from "react";
import CreateUser from "./CreateUser";

export default class Profile extends React.Component {

    state = {
        loaded: false,
        posts: ""
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
            let errorMaybe = false;
            console.log(this.props.user);
            // const data = {
            //     username: this.props.user.username,
            //     password: this.props.user.password,
            //     displayName: this.props.user.displayName,
            // }

            fetch('http://localhost:8080/posts/', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                 body: JSON.stringify(this.props.user)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
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
                console.log(this.state.posts);
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
        if (this.props.logged) {
            return(
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-header">{this.props.user.displayName}</div>
                                <div className="card-body">
                                    <p>Username: {this.props.user.username}</p>
                                    <p>Password: {this.props.user.password}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
              <CreateUser/>
            );
        }

    }

}