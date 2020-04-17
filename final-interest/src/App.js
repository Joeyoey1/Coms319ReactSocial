import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Form from './form';





//IF YOU WANT THE RESULT PRINTED AS AN OBJECT TO CONSOLE
class App extends Component {

onSubmit =(fields) => {console.log("App comp got: ", fields)};

    render() {
    return (
    <div className="App">
    <Form onSubmit={fields => this.onSubmit(fields)} />
    </div>

    );
    }
}

export default App;
