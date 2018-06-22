import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

export default class Charts extends Component {
  constructor(props) {
    super();
    this.state = {
      IssuePerUSer: {},
      CommentPerUser: {},
      CommentPerIssue: {}
    };
  }
  componentDidMount() {
    axios.get("/api/admin/issuecount").then(res => {
      const issue = res.data;
      let username = [];
      let issueCount = [];
      issue.forEach(element => {
        username.push(element.username);
        issueCount.push(element.issue_count);
      });
      this.setState({
        IssuePerUSer: {
          labels: username,
          datasets: [
            {
              label: "Issue created by each user",
              data: issueCount,
              backgroundColor: [
                "#F7464A",
                "#58D68D",
                "#F5B041",
                "#A569BD",
                "#4D5360"
              ],
              borderColor: ["rgb(203, 44, 44)", "rgba(54, 162, 235, 1)"],
              borderWidth: 2
            }
          ]
        }
      });
    });
    axios.get("/api/admin/commentcount").then(res => {
      const comment = res.data;
      let posted_by = [];
      let commentCount = [];
      comment.forEach(element => {
        posted_by.push(element.posted_by);
        commentCount.push(element.comment_count);
      });
      this.setState({
        CommentPerUser: {
          labels: posted_by,
          datasets: [
            {
              label: "comment created by each user",
              data: commentCount,
              backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#2A2AA4",
                "#E6EE72",
                "#CB2C2C",
                "#5FEA92",
                "#EE28EE",
                "#EFEFE2"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "#5FEA92",
                "#EE28EE",
                "#EFEFE2"
              ],
              borderWidth: 1
            }
          ]
        }
      });
    });
    axios.get("/api/admin/issuecomment").then(res => {
      console.log("Comment by issue", res.data);
      const commentbyIssue = res.data;
      let Issue_id = [];
      let commentCount = [];
      commentbyIssue.forEach(element => {
        Issue_id.push(element.issue_id);
        console.log(Issue_id);
        commentCount.push(element.comment_count);
      });
      this.setState({
        CommentPerIssue: {
          labels: Issue_id,
          datasets: [
            {
              label: "Comment Per Issue ",
              data: commentCount,
              backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#2A2AA4",
                "#E6EE72",
                "#CB2C2C",
                "#5FEA92",
                "#EE28EE",
                "#EFEFE2"
              ],
              hoverBackgroundColor: [
                "#FF5A5E",
                "#5AD3D1",
                "#FFC870",
                "#A8B3C5",
                "#616774"
              ],
              borderWidth: 1
            }
          ]
        }
      });
    });
  }

  render() {
    const { chartType } = this.props;
    return (
      <div>
        {chartType === "issue" ? (
          <div className="">
            <h1 className="admin-heading-text"> Issue count by each User</h1>
            <Pie
              data={this.state.IssuePerUSer}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : null}

        {chartType === "comment" ? (
          <div>
            <h1 className="admin-heading-text">
              {" "}
              Comment Posted by Each user{" "}
            </h1>
            <div className="container">
              <Bar
                data={this.state.CommentPerUser}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    labels: {
                      // This more specific font property overrides the global property
                      fontColor: "white"
                      // fontSize: "20px"
                    }
                  }
                }}
              />
            </div>
          </div>
        ) : null}

        {chartType === "commentonissue" ? (
          <div>
            <h1 className="admin-heading-text"> Comment Count Per Issue Id </h1>
            <div className="container">
              <Bar
                data={this.state.CommentPerIssue}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
