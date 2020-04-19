import React from "react";

export default class CreatePost extends React.Component {

    state = {
        title: "",
        content: "",
        error: false
    }



    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    onSubmit = (e) => {
        e.preventDefault();



        const data = {
            title: String(this.state.title),
            content: String(this.state.content),
            author: null
        };

        let errorHap = false;
        console.log(JSON.stringify(data));
        fetch('http://localhost:8080/posts/newpost/' + this.props.user.id, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                errorHap = true;
                console.log(error)
            });


        //clear after submitting
        this.setState({
            title: "",
            content: "",
            error: errorHap
        });


    };

    renderError() {
        if (this.state.error) {
            return (
                <div id="creation error">
                    <span className="error text-danger">Error creating post! Please retry or contact support!</span>
                    <br/>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="card">
                {this.renderError()}
                <div className="card-body form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" name="title" type="text" placeholder="Title"
                           value={this.state.title} onChange={event => this.change(event)}/>
                    <textarea className="form-control mr-lg-2" name="content" placeholder="Content"
                           value={this.state.content} onChange={event => this.change(event)}/>
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit"
                            onClick={event => this.onSubmit(event)}>Create Post
                    </button>
                </div>
            </div>
        );
    }

}