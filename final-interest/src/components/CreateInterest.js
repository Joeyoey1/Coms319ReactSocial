import React from 'react';

export default class CreateInterest extends React.Component {

    state = {
        groupName: "",
        location: "",
        summary: "",
    }

    change = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: String(this.state.groupName),
            location: String(this.state.location),
            description: String(this.state.summary)
        };

        fetch('http://localhost:8080/createinterest', {
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
            groupName: "",
            location: "",
            summary: "",
        });


    };


    render() {
        return (
            <form>
                <h1>Create Interest Group</h1>
                <input
                    name='groupName'
                    placeholder="Group Name"
                    value={this.state.groupName}
                    onChange={e => this.change(e)}/>
                <br/>

                <input
                    name='location'
                    placeholder="Location"
                    value={this.state.location}
                    onChange={e => this.change(e)}/>
                <br/>

                <input
                    name='summary'
                    placeholder="Summary"
                    value={this.state.summary}
                    onChange={e => this.change(e)}/>
                <br/>

                <button
                    onClick={e => this.onSubmit(e)}>Submit
                </button>
            </form>
        );
    }
}