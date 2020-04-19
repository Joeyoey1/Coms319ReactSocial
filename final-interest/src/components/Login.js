import React from 'react';

export default class Login extends React.Component {

    state = {
        username: "",
        password: "",
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

        let data = {username: String(this.state.username), password: String(this.state.password)};

        fetch('http://localhost:8080/login', {
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
            username: "",
            password: "",
        });

    };

    renderError() {
        if (this.state.error) {
            return (
                <div id="login error">
                    <span className="error text-danger">Error logging in! Please retry or make an account!</span>
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
                    <input className="form-control mr-sm-2" name="username" type="text" placeholder="Username"
                           value={this.state.username} onChange={event => this.change(event)}/>
                    <input className="form-control mr-sm-2" name="password" type="password" placeholder="Password"
                           value={this.state.password} onChange={event => this.change(event)}/>
                    <button className="btn btn-outline-primary my-2 my-sm-0 mr-sm-2" type="submit"
                            onClick={event => this.onSubmit(event)}>Login
                    </button>
                    <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit"
                            onClick={event => this.props.pageChange("createAccount")}>Create Account
                    </button>
                </div>
            </div>
        );
    }
}