//react code here for Create group
import React from "react";
import ReactDOM from "react-dom";


import React from "react";

export default class Form extends React.Component {
  state = {
    Name: "",
    summary: "",
    location: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      Name: "",
      summary: "",
      location: ""
    });
    this.props.onChange({
      Name: "",
      summary: "",
      location: ""
    });
  };

  render() {
    return (
      <form>
        <input
          name="groupName"
          placeholder="Group name"
          value={this.state.Name}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="summary"
          placeholder="Summary"
          value={this.state.summary}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="location"
          type="location"
          placeholder="Location"
          value={this.state.location}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
