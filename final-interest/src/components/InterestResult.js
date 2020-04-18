import React from 'react';

export default class InterestResult extends React.Component{

    state = {
        phrase: "",
        response: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);

        fetch('http://localhost:8080/interest/search/' + String(this.state.phrase))
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    response: data
                });
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        //clear after submitting
        this.setState({
            phrase: ""
        });
    };


    render() {
        if (this.state.phrase !== "" && this.state.response.length === 0) {
            <div>
                <h4>Results</h4>
                <ul>
                    {this.state.response.map((interest, i) => <li key={i}>{interest}</li>)}
                </ul>
            </div>
        } else {
            return (
                <form>
                <h1>Search Interest Groups</h1>
                <input
                    name='phrase'
                    placeholder="Phrase to Search"
                    value={this.state.phrase}
                    onChange={e => this.change(e)}/>

                <br/>
                <button
                    onClick={e => this.onSubmit(e)}>Submit
                </button>
            </form>
            );
        }
    }
}