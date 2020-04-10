// src/App.js

  import React, {Component} from 'react';
  import Contacts from './components/contacts';

  class App extends Component {
    render () {
      return (
        <Contacts contacts={this.state.contacts} />
      );
    }
    componentDidMount() {
      //// TODO:
      //EDIT THE LINK HERE
       fetch('http://jsonplaceholder.typicode.com/users')
       .then(res => res.json())
       .then((data) => {
         this.setState({ contacts: data })
       })
       .catch(console.log)
     }
  }

  export default App;
