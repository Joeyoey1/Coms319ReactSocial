// src/App.js

  import React, {Component} from 'react';
  import Contacts from './components/contacts';

const API_PATH = 'http://localhost:1992/react-contact-form/api/contact/index.php';
  class App extends Component {
    // state = {
    //     contacts: []
    //   }




    // render () {
    //   return (
    //     <Contacts contacts={this.state.contacts} />
    //   );
    // }

    handleFormSubmit = e => {
  e.preventDefault();
  axios({
    method: 'post',
    url: `${API_PATH}`,
    headers: { 'content-type': 'application/json' },
    data: this.state
  })
    .then(result => {
      this.setState({
        mailSent: result.data.sent
      })
    })
    .catch(error => this.setState({ error: error.message }));
};

    render() {
  return (
    <div className="App">
    <p>Contact Me</p>
    <div>
    <form action="/action_page.php">
    <label>First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name.." />
    <label>Last Name</label>
    <input type="text" id="lname" name="lastname" placeholder="Your last name.." />


    <label>Email</label>
    <input type="email" id="email" name="email" placeholder="Your email" />


    <label>Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
    <input type="submit" value="Submit" />
    <div>
  {this.state.mailSent &&
    <div>Thank you for contcting us.</div>
  }
</div>
    </form>
    </div>
    </div>
  );
}

    // componentDidMount() {
    //   //// TODO: switch commented
    //   //fetch('http://localhost:8080')
    //    fetch('http://jsonplaceholder.typicode.com/users')
    //    .then(res => res.json())
    //    .then((data) => {
    //      this.setState({ contacts: data })
    //    })
    //    .catch(console.log)
    //  }
  }

  export default App;
