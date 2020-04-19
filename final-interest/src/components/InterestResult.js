import React from 'react';

export default class InterestResult extends React.Component {

    state = {
        phrase: "",
        response: ""
    }

    change = (target, value) => {
        this.setState({
            [target]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/interest/search/'.concat(String(this.state.phrase)))
            .then((response) => response.json())
            .then((data) => {
                this.change("response", data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        this.setState({
            phrase: ""
        });
    };


    render() {
        if (this.state.phrase !== "" && this.state.response.length === 0) {
            return (
                <div>
                    <h4>Results</h4>
                    <ul>
                        {this.state.response.map((interest, i) => <li key={i}>{interest}</li>)}
                    </ul>
                </div>
            );
        }
    }
}