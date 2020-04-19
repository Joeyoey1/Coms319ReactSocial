import React from 'react';
import Nav from "./components/Navbar";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import CreatePost from "./components/CreatePost";
import ViewPosts from "./components/ViewPosts";

export default class MainPage extends React.Component {


    state = {
        currentView: "main",
        currentUser: {username: "", password: "", displayName: ""},
        loggedIn: false
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

    interestSearch = (phrase) => {

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
                return (<CreatePost user={this.state.currentUser} logged={this.state.loggedIn}/>);
            case "posts":
                return (<ViewPosts/>);
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