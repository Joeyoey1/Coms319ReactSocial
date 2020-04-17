//react code here for Create group
import React from "react";
import ReactDOM from "react-dom";


import React from "react";

export default class Form extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    fname: '',
    lname: '',
    email: '',
    message: '',
  }
}

//form submit handler
handleFormSubmit( event ) {
  event.preventDefault();
  console.log(this.state);
}

//form handler
constructor(props) {
  super(props);
  this.state = {
    fname: '',
    lname: '',
    email: '',
    message: '',
  }
}

//error handling
this.state = {
  fname: '',
  lname: '',
  email: '',
  message: '',
  mailSent: false,
  error: null
}
  // state = {
  //   Name: "",
  //   summary: "",
  //   location: ""
  // };
  //
  // change = e => {
  //   this.props.onChange({ [e.target.name]: e.target.value });
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };
  //
  // onSubmit = e => {
  //   e.preventDefault();
  //   // this.props.onSubmit(this.state);
  //   this.setState({
  //     Name: "",
  //     summary: "",
  //     location: ""
  //   });
  //   this.props.onChange({
  //     Name: "",
  //     summary: "",
  //     location: ""
  //   });
  // };
  //
  // render() {
  //   return (
  //     <form>
  //       <input
  //         name="groupName"
  //         placeholder="Group name"
  //         value={this.state.Name}
  //         onChange={e => this.change(e)}
  //       />
  //       <br />
  //       <input
  //         name="summary"
  //         placeholder="Summary"
  //         value={this.state.summary}
  //         onChange={e => this.change(e)}
  //       />
  //       <br />
  //       <input
  //         name="location"
  //         type="location"
  //         placeholder="Location"
  //         value={this.state.location}
  //         onChange={e => this.change(e)}
  //       />
  //       <br />
  //       <button onClick={e => this.onSubmit(e)}>Submit</button>
  //     </form>
  //   );
  // }
  //WHERE DO I PUT THIS
  <p>Contact Me</p>
<div>
<formaction="#" >
  <label>First Name</label>
  <input type="text" id="fname" name="firstname" placeholder="Your name.."
    value={this.state.fname}
    onChange={e => this.setState({ fname: e.target.value })}
  />
  <label>Last Name</label>
  <input type=" text" id="lname" name="lastname" placeholder="Your last name.."
    value={this.state.lname}
    onChange={e => this.setState({ lname: e.target.value })}
  />


  <label>Email</label>
  <input type="email" id="email" name="email" placeholder="Your email"
    value={this.state.email}
    onChange={e => this.setState({ email: e.target.value })}
  />


  <label>Message</label>
  <textarea id="message" name="message" placeholder="Write something.."
    onChange={e => this.setState({ message: e.target.value })}
    value={this.state.message}
  ></textarea>
  <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
</form >
</div>
}
