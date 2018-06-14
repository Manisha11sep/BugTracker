import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import "./../style/NewIssueStyle.css";

const IssueHeading = styled.h1`
  color: white;
  font-size: 25px;
  text-align: center;
  padding: 15px 15px;
  margin:0 auto;
`;
const IssueText = styled.h4`
  color: white;
  text-align: center;
  padding: 15px 15px;
  margin:0 auto;
`;

export default class NewIssue extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      posted_by: "",
      files: []
    };
    this.createIssue = this.createIssue.bind(this);
    // this.clearForm=this.clearForm.bind(this);
  }

  createIssue() {
    const { title, description } = this.state;

    var last_updated = new Date();
    console.log("inside createpost", { description, title });
    axios
      .post("/api/issue/create", { description, title, last_updated })
      .then(response => this.setState({ title: "", description: "" }));

    alert("Thank you for Creating a new Issue on Bug Tracker!!");
    this.setState({ title: "", description: "" });
  }

  render() {
    return (
      <div className="content">
          <IssueHeading>
            <p> Create a New Issue </p>
          </IssueHeading>
          {/* <IssueBox> */}
          <div className="issue-box">
            <div className="issue-title">
            <IssueText> Title  </IssueText>
          
              <div>
                <input
                  name="Title"
                  value={this.state.title}
                  placeholder="Enter Title"
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
              </div>
            <IssueText> Issue Description </IssueText>

              <div>
                <textarea
                  name="Description"
                  value={this.state.description}
                  placeholder="Enter Issue Description"
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <button class="btn btn-primary" onClick={() => this.createIssue()}>
                Submit a Issue
              </button>
            </div>
          </div>
        </div>
    
    );
  }
}
