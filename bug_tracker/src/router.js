import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NewIssue from "./components/NewIssue";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import Search from "./components/Search";
import Home from "./components/Home";
import GithubIssues from "./components/GithubIssues";

export default (
  <div>
    <Switch>
      <Route component={Login} exact path="/" />
      <Route component={Dashboard} path="/dashboard" />
      <Route component={NewIssue} path="/issue" />
      <Route component={Signup} path="/signup" />
      <Route component={AdminDashboard} path="/admin" />
      <Route component={Search} exact path="/search" />
      <Route component={Home} path="/home" />
      <Route component={GithubIssues} path="/githubissue" />
    </Switch>
  </div>
);
