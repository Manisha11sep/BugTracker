import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Issue from './components/Issue/NewIssue';
import Signup from './components/Signup/Signup';



export default (
  <Switch>
    <Route component={ Login} exact path="/" />
    <Route component={ Dashboard } path="/dashboard"/>
    {/* <Route component={ Issue } path="/issue/:issueid" /> */}
    <Route component={ Signup} path="/signup" />
  </Switch>
)