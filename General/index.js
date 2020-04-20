import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../login';
import Register from '../register';
import Userpage from '../userpage';
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />   
      <Route path="/userpage" component={Userpage} />
    </Switch>
  );
}