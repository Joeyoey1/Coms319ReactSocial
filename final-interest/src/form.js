import React from 'react';
import './form.css';

export default class Form extends React.Component {
//holds values for what the user inputs
state = {
    groupName: "",
    location: "",
    summary: "",

}

change = (e) => {
//UNCOMMENT THE LINE BELOW WHEN SWITCHING APP CODE
//this.props.onChange({[e.target.name]: e.target.value});
this.setState({
[e.target.name]: e.target.value
});
};

//click submit and display results to console
onSubmit = (e) => {
e.preventDefault();
this.props.onSubmit(this.state);

//this.state is the object with the three values

    //console.log(this.state);

//SEND OBJECT TO THE SERVER
var gname = this.state.groupName;
var loc = this.state.location;
var summ = this.state.summary;

const data = { GroupName: this.gname, Location: this.loc, Summary: this.summ};

fetch('http://localhost:8080', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
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


//refresh and keep the values in state
render() {
return (
//create onchange function to edit text field
    <form>
       <input
       name='groupName'
        placeholder="Group Name"
       value={this.state.groupName}
       onChange={e => this.change(e)} />

        <br />

       <input
       name='location'
       placeholder="Location"
              value={this.state.location}
              onChange={e => this.change(e)} />

        <br />

        <input
        name='summary'
        placeholder="Summary"
               value={this.state.summary}
               onChange={e => this.change(e)} />

        <br />

     <button onClick={e => this.onSubmit(e)}>Submit</button>
    </form>
       );
    }
}