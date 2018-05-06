import axios from "axios";
import React, { Component } from "react";
//Importing filterIssueByUser from utils unit test
import {filterIssueByUser} from '../utils';

export default class Issue extends Component {
  constructor() {
    super();
    this.state = {
      filterIssue: "",
      issues: [],
      issueList: []
      //    filteredIssuebyUser:[]
    };
    // this.filterIssueByUser = this.filterIssueByUser.bind(this);
  }

  componentDidMount() {
    axios.get("/api/admin/issue").then(response => {
      this.setState({ issues: response.data });
      console.log("Inside admin issues are ", this.state.issues);
    });
  }

  // filterIssueByUser() {
  //   return this.state.issues.filter(issue => {
  //     return (
  //       issue.posted_by
  //         .toLowerCase()
  //         .indexOf(this.state.filterIssue.toLowerCase()) >= 0
  //     );
  //   });
  // }

  render() {
    //Importing filterIssueByUser from utils unit test
    const filteredIssues = filterIssueByUser(this.state.issues, this.state.filterIssue);
    const issueList = (
      <table>
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
        <input
          type="text"
          placeholder="Enter Username to Search!!"
          onChange={e => this.setState({ filterIssue: e.target.value })}
        />
        <button> Filter by User </button>
        <h1 className="bug-text"> List of Issues/Bugs </h1>
        {issueList};
      </div>
    );
  }
}
