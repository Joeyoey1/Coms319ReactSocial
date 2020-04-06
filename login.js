import React from "react";
//import ReactDOM from "react-dom";


const validate = errors => 
{
    let valid = true;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false)
    );
    return valid;
}

class Login extends React.Component {

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
      case "password":
        errors.password = 
          value.length < 8
          ? "Passwords are at least 8 characters long"
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
   let newsubmit = ""
   if(validate(this.state.errors))
   {
     //put redirect here
   }
   else
   {
      newsubmit = "No such user information exists";
   }
   this.setState({submit: newsubmit});
 }

	

 render() {
   const {errors} = this.state;
   return (
     <form className="form-inline" onSubmit={this.handleSubmit} noValidate>
       <h1>Log in</h1>
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
      <div className = "password">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            onChange = {this.handleChange} noValidate
            //ref={input => this.password = input}
          />
          {errors.password.length >= 0 &&
            <span className = "error"> {errors.password}</span>
          }
      </div>
        <br></br>
      <br></br>
       <button
        type="submit"> Sign in
        </button>
      <div className="submit">
      <button type= "submit"> Register New Account</button>
      </div>
      <div className="validityStatus">
        {
          errors.submit &&
          <span className = "error"> {errors.submit}  </span>
        }    
      </div>

     </form>
   );
 }
}

export default Login;