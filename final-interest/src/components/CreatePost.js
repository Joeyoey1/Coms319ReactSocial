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

    changeError = (variable, value) => {
        this.setState({
            [variable]: value
        });
    };


    onSubmit = (e) => {
        e.preventDefault();



        const data = {
            title: String(this.state.title),
            content: String(this.state.content),
            author: null
        };

        fetch('http://localhost:8080/posts/newpost/' + this.props.user.id, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then(() => {
                this.props.pageChange("posts")
            })
            .catch((error) => {
                this.changeError("error", true);
                console.log(error);
            });


        //clear after submitting
        this.setState({
            title: "",
            content: "",
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
                <div className="card-body my-2 my-lg-0">
                    <input className="form-control my-2 mr-sm-2" name="title" type="text" placeholder="Title"
                           value={this.state.title} onChange={event => this.change(event)}/>
                    <textarea className="form-control my-2 mr-lg-2" name="content" placeholder="Content"
                           value={this.state.content} onChange={event => this.change(event)}/>
                    <button className="btn btn-outline-primary my-2 my-sm-2" type="submit"
                            onClick={event => this.onSubmit(event)}>Create Post
                    </button>
                </div>
            </div>
        );
    }

}