import React from "react";

export default class UserCreate extends React.Component {

    state = {
        sUsername: "",
        sPassword: "",
        sDisplayName: "",
        success: false
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);

        const data = {username: String(this.state.sUsername), password: String(this.state.sPassword), displayName: String(this.state.sDisplayName)};

        fetch('http://localhost:8080/createuser', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        //clear after submitting
        this.setState({
            sUsername: "",
            sPassword: "",
            sDisplayName: "",
        });


    };


    render() {
        return (
            <form>
                <h1>Create New User</h1>
                <input
                    name='username'
                    placeholder="Username"
                    value={this.state.sUsername}
                    onChange={e => this.change(e)}/>
                <br/>

                <input
                    name='password'
                    placeholder="Password"
                    value={this.state.sPassword}
                    onChange={e => this.change(e)}/>

                <br/>

                <input
                    name='displayName'
                    placeholder="DisplayName"
                    value={this.state.sDisplayName}
                    onChange={e => this.change(e)}/>

                <br/>

                <button
                    onClick={e => this.onSubmit(e)}>Submit
                </button>
            </form>
        );
    }

}