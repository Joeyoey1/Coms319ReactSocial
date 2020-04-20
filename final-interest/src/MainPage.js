import React from 'react';
import Nav from "./components/Navbar";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import CreatePost from "./components/CreatePost";
import ViewPosts from "./components/ViewPosts";
import OtherUser from "./components/OtherUser";
import SinglePost from "./components/SinglePost";

export default class MainPage extends React.Component {


    state = {
        currentView: "main",
        currentUser: {username: "", password: "", displayName: ""},
        loggedIn: false,
        viewUsername: "",
        postId: 0,
        searchResult: ""
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    pageChange = (newPage) => {
        this.setState({currentView: newPage})
    }

    handleLogin = (user) => {
        this.setState({
            currentUser: user,
            currentView: "main",
            loggedIn: true
        });
    }

    handleUserClick = (username) => {
        this.setState({
            currentView: "userView",
            viewUsername: username
        });
    }

    postViewClick = (postId) => {
        this.setState({
            currentView: "postView",
            postId: postId
        })
    }

    postSearch = (phrase) => {
        fetch('http://localhost:8080/posts/search/' + phrase)
            .then((response) => response.json())
            .then((data) => {
                this.change("searchResult", data);
            })
            .catch(() => {
                this.change("searchResult", null);
            });
    }

    currentPageLoader() {
        switch (this.state.currentView) {
            case "main":
                return (<Profile logged={this.state.loggedIn} user={this.state.currentUser}/>);
            case "login":
                return (<Login handleLogin={this.handleLogin} pageChange={this.pageChange}/>);
            case "createAccount":
                return (<CreateUser handleLogin={this.handleLogin}/>);
            case "createPost":
                return (<CreatePost user={this.state.currentUser} logged={this.state.loggedIn} pageChange={this.pageChange}/>);
            case "posts":
                return (<ViewPosts userClick={this.handleUserClick} postView={this.postViewClick}/>);
            case "userView":
                return (<OtherUser viewUsername={this.state.viewUsername}/>);
            case "postView":
                return (<SinglePost userClick={this.handleUserClick} postId={this.state.postId} user={this.state.currentUser} logged={this.state.loggedIn}/>);
            default:
                return (<Profile logged={this.state.loggedIn} user={this.state.currentUser}/>);
        }
    }


    render() {
        return (
            <div>
                <Nav logged={this.state.loggedIn} user={this.state.currentUser} pageChange={this.pageChange}/>
                {this.currentPageLoader()}
                <Footer/>
            </div>
        );
    }
}