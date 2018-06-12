import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./../style/Sidenav.css";
import { connect } from "react-redux";
import { logout, issueList } from "../ducks/reducer";
import Profile from "./Profile";
import Charts from "./Charts";
import Email from "./Email";
import GithubIssues from "./GithubIssues";
import Issue from "./../components/Issue";
import Search from "./Search";
class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      userdetail: [],
      users: [],
      comments: [],
      issues: [],
      issueCount: [],
      commentCount: [],
      commentCountByIssue: [],
      IssuePerUSer: {},
      CommentPerUser: {},
      CommentPerIssue: {},
      to: [],
      subject: "",
      body: "",
      issueState: false,
      emailState: false,
      open: "",
      chartType: "",
      issue_id: ""
    };

    this.getComment = this.getComment.bind(this);

    this.logout = this.logout.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getIssueChart = this.getIssueChart.bind(this);
    this.getCommentChart = this.getCommentChart.bind(this);
    this.getCommentOnIssue = this.getCommentOnIssue.bind(this);
    this.getGithub = this.getGithub.bind(this);
    this.getBug = this.getBug.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getSearchissue = this.getSearchissue.bind(this);
  }

  componentDidMount() {
    axios.get("/api/session").then(response => {
      console.log("inside header user data", response.data);
      this.setState({ userdetail: response.data });
      console.log("user deails", this.state.userdetail);
    });
  }

  getComment() {
    axios.get("/api/admin/comment").then(response => {
      this.setState({ comments: response.data });
      console.log("Inside admin", this.state.comments);
    });
  }

  //setting the state for open
  getEmail() {
    this.setState({ open: "email" });
  }
  //setting the state for open
  getIssueChart() {
    this.setState({ open: "charts", chartType: "issue" });
  }
  //setting the state for open
  getCommentChart() {
    this.setState({ open: "charts", chartType: "comment" });
  }
  //setting the state for open
  getCommentOnIssue() {
    this.setState({ open: "charts", chartType: "commentonissue" });
  }
  //setting the state for open
  getGithub() {
    this.setState({ open: "github" });
  }
  //setting the state for open
  getBug() {
    this.setState({ open: "issues" });
  }
  //setting the state for open
  getComments() {
    this.setState({ open: "comments" });
  }
  //setting the state for open
  getUsers() {
    this.setState({ open: "users" });
  }
  //setting the state for open
  getSearchissue() {
    this.setState({ open: "search" });
  }

  logout = () => {
    axios.post("/api/logout").then(response => {
      if (response.data === "logged out") {
        window.location.href = "/";
      }
    });
  };

  render() {
    const issues = this.props.issues;
    //Mapping through the issue into a table using map function
    const commentList = (
      <table className="container">
        <tr>
          <th>Issue_id</th>
          <th>Issue_title</th>
          <th>Comment</th>
          <th>Comment_by</th>
        </tr>
        {this.state.comments.map((comment, i) => {
          return (
            <tr>
              <td>{comment.issue_id}</td>
              <td>{comment.issue_title}</td>
              <td>{comment.comment}</td>
              <td>{comment.posted_by}</td>
            </tr>
          );
        })}
      </table>
    );
    return (
      <div className=" admin-dashboard">
        <div className="main-sidebar">
          <div className="nav-side-menu">
            <div className="panel panel-primary">
              <div className="panel-heading">
                Welcome, {this.state.userdetail.username}
              </div>
              <div className="panel-body">
                <img
                  className="profile-pic"
                  src={this.state.userdetail.profile_pic}
                />
              </div>
              <div className="panel-footer">
                {this.state.userdetail.username}
              </div>
            </div>

            <i
              className="fa fa-bars fa-2x toggle-btn"
              data-toggle="collapse"
              data-target="#menu-content"
            />
            <div className="menu-list">
              <ul id="menu-content" className="menu-content collapse out">
                <button
                  className="btn btn-primary"
                  data-toggle="collapse"
                  data-target="#charts"
                >
                  <i className="fa fa-line-chart" /> Charts
                </button>

                <ul className="sub-menu collapse" id="charts">
                  <li onClick={this.getCommentChart}>
                    {/* calling funciton to set state of open on click of chart */}
                    <a data-toggle="collapse" href="#CommentByUSer">
                      {" "}
                      Comment posted by users
                    </a>
                  </li>
                  <li onClick={this.getIssueChart}>
                    <a data-toggle="collapse" href="#IssueByUser">
                      Issue posted by User
                    </a>
                  </li>
                  <li onClick={this.getCommentOnIssue}>
                    <a data-toggle="collapse" href="#CommentByIssue">
                      Comment on issues
                    </a>
                  </li>
                </ul>

                <li>
                  <button className="btn btn-primary" onClick={this.getUsers}>
                    <i className="fa fa-users fa-lg" /> Users
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#email"
                    onClick={this.getEmail}
                  >
                    <i class="fa fa-envelope" /> Email
                  </button>
                </li>
                <li onClick={this.getBug}>
                  <button
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#issue"
                    onClick={this.getIssue}
                  >
                    <i class="fa fa-exclamation-triangle" /> Get All the Bugs
                  </button>
                </li>

                <li onClick={this.getComments}>
                  <button
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#comment"
                    onClick={this.getComment}
                  >
                    <i class="fa fa-comments" /> Get All the Comment
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#github"
                    onClick={this.getGithub}
                  >
                    <i class="fa fa-github" />Get Issues from Github
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#searchissue"
                    onClick={this.getSearchissue}
                  >
                    <i class="fa fa-search" /> Search Issue
                  </button>
                </li>
                <li>
                  <button className="btn btn-primary">
                    <Link to="/" onClick={this.logout}>
                      <i class="fa fa-sign-out" />Log out
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* ************************************************Display section of Admin Page *************************************** */}

        <div id="main">
          {/* if value of open is "issues" then call Issue component otherwise null */}
          {this.state.open === "issues" ? <Issue /> : null}
          {/* if value of open is "comments" then show comments otherwise null */}
          {this.state.open === "comments" ? (
            <div>
              <h1 className="admin-heading-text"> List of Comments </h1>
              <div className="container">{commentList}</div>
            </div>
          ) : null}

          {this.state.open === "charts" ? (
            <Charts chartType={this.state.chartType} />
          ) : null}

          {/* if value of open is "users" then call users component otherwise null */}

          {this.state.open === "users" ? <Profile /> : null}

          {/* if value of open is "github" then call GithubIssue component otherwise null */}
          {this.state.open === "github" ? <GithubIssues /> : null}

          {/* if value of open is "email" then call Email component otherwise null */}
          {this.state.open === "email" ? (
            <Email username={this.state.username} />
          ) : null}

          {/* if value of open is "search" then call search component otherwise null */}
          {this.state.open === "search" ? <Search /> : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  issueList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
