import React, { Component } from "react";
import { render } from "react-dom";
import './App.css';
import Form from './form';
import Nav from './components/Navbar'
import Profile from './components/Profile'



//IF YOU WANT THE RESULT PRINTED AS AN OBJECT TO CONSOLE
class App extends Component {

onSubmit =(fields) => {console.log("App comp got: ", fields)};

    render() {
    return (
    <div className="App">
        <Nav/>
        <Profile/>
    <Form onSubmit={fields => this.onSubmit(fields)} />
    </div>

    );
    }
}

export default App;
