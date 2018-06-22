import axios from "axios";
import React, { Component } from "react";
//Importing filterIssueByUser from utils unit test
import { filterIssueByUser } from "../utils";

export default class Issue extends Component {
  constructor() {
    super();
    this.state = {
      filterIssue: "",
      issues: [],
      issueList: []
    };
  }

  componentDidMount() {
    axios.get("/api/admin/issue").then(response => {
      this.setState({ issues: response.data });
      console.log("Inside admin issues are ", this.state.issues);
    });
  }
  render() {
    //Importing filterIssueByUser from utils unit test
    const filteredIssues = filterIssueByUser(
      this.state.issues,
      this.state.filterIssue
    );
    const issueList = (
      <table className="">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Posted By</th>
          <th>Last Updated</th>
        </tr>
        {filteredIssues.map((issue, i) => {
          return (
            <tr>
              <td>{issue.issue_title}</td>
              <td>{issue.description}</td>
              <td>{issue.posted_by}</td>
              <td>{issue.last_updated}</td>
            </tr>
          );
        })}
      </table>
    );


    return (
      <div>
        <h1 className="admin-heading-text"> List of Issues/Bugs </h1>
        {/* class from html.css file */}
        <div className="filter-user">
          <input
            placeholder="Enter Username to Search!!"
            onChange={e => this.setState({ filterIssue: e.target.value })}
          />
          <button className="filter-button">
            <b>Filter by User</b>{" "}
          </button>
        </div>
        {issueList};
      </div>
    );
  }
}
