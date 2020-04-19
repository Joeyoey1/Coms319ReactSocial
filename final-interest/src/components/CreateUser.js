import React from "react";

export default class UserCreate extends React.Component {

    state = {
        sUsername: "",
        sPassword: "",
        sDisplayName: "",
        error: false
    }



    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeError = (variable, value) => {
        this.setState({
            [variable]: value
        });
    };

    login = (data) => {
        this.props.handleLogin(data);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: String(this.state.sUsername),
            password: String(this.state.sPassword),
            displayName: String(this.state.sDisplayName)
        };



        fetch('http://localhost:8080/createuser', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                this.login(data);
            })
            .catch(() => {
                this.changeError("error", true);
            });


        //clear after submitting
        this.setState({
            sUsername: "",
            sPassword: "",
            sDisplayName: "",
        });


    };

    renderError() {
        if (this.state.error) {
            return (
                <div id="creation error">
                    <span className="error text-danger">Error creating account! Please retry or contact support!</span>
                    <br/>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="card">
                {this.renderError()}
                <div className="card-body form-inline my-2 my-lg-0 mx-auto">
                    <input className="form-control mr-sm-2" name="sUsername" type="text" placeholder="Username"
                           value={this.state.sUsername} onChange={event => this.change(event)}/>
                    <input className="form-control mr-sm-2" name="sPassword" type="password" placeholder="Password"
                           value={this.state.sPassword} onChange={event => this.change(event)}/>
                    <input className="form-control mr-sm-2" name="sDisplayName" type="text" placeholder="DisplayName"
                           value={this.state.sDisplayName} onChange={event => this.change(event)}/>
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit"
                            onClick={event => this.onSubmit(event)}>Create Account
                    </button>
                </div>
            </div>
        );
    }

}