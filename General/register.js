import React from "react";
//import ReactDOM from "react-dom";
import {useHistory} from 'react-router-dom';


const validate = errors => 
{
    let valid = true;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false)
    );
    return valid;
}

class Register extends React.Component {

  constructor(props)
  {
    super(props);
    
    this.state = 
    {
      username: null, 
      password: null, 
      submit: null,
      errors: 
      {
        username: "", 
        password: "",
        submit: "",
      }
    };
  }

 


 handleChange = event => {
   event.preventDefault();
   const {name, value} = event.target;
   let errors = this.state.errors;
   switch (name) 
   {
     case "username":
       errors.username = 
         value.length < 4
           ? "Usernames are at least 4 characters long"
           : "";
      break;
      default:
        break;
   }
   this.setState({errors, [name]: value})
 };

 handleSubmit = event =>
 {
   event.preventDefault();
   const data = {username: this.username};
   let errors = this.state.errors;
   const history = useHistory();
   if(errors.username.length > 3)
   {
    const response = fetch('http://localhost:8080/createuser', {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch(console.log);
      //fix this condition
    if(validate(this.state.errors))
    {
      this.setState({errors, submit: "User submission successful"});
      history.push("/Login");
    }
    else
    {
     this.setState({errors, submit: "Username taken"});
    }
   }
   else
   {
     this.setState({errors, submit: "Invalid login information"});
   }
   
 }

	

 render() {
   const {errors} = this.state;
   return (
     <form className="form-inline" onSubmit={this.handleSubmit} noValidate>
       <h1>Register</h1>
       <div className="username">
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            onChange={this.handleChange} noValidate
            //ref={input => this.username = input}
          />
          {errors.username.length >= 0 &&
            <span className = "error"> {errors.username}</span>
          }
       </div>
      <br></br>
      <br></br>
      <div className="submit">
      <button type= "submit"
        onSubmit={this.handleSubmit} noValidate> Register New Account</button>
      {
          errors.submit.length !== 0 &&
          <span className = "error"> {errors.submit}  </span>
        }   

      </div>
     </form>
   );
 }
}

export default Register;