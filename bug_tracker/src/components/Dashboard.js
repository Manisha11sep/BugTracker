import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import { connect } from "react-redux";
import { issueList } from "../ducks/reducer";
import SearchIcon from "react-icons/lib/md/search";
// import Profile from './Profile';
import Footer from "./Footer";
import "./../style/DashboardStyle.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      text: "",
      comments: [],
      user: {},
      showEditAndDelete: false,
      message: []
    };
    this.updateText = this.updateText.bind(this);
    // this.loadcomments = this.loadcomments.bind(this);
    // this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    axios.get("/api/issue/getAll").then(response => {
      // this.setState({ issues: response.data });
      this.props.issueList(response.data);
      console.log("inisde mount", this.state.issues);
    });
  }

  updateText(event) {
    this.setState({ text: event.target.value });
    console.log(this.state.text);
  }

  checkIfUserCanEdit(comment) {
    console.log(this.props.username);
    return this.props.username === comment.posted_by;
  }

  deleteComment(id) {
    console.log("delete  triggered", id);
    axios
      .post(`/api/comment/${id}`)
      .then(res => {
        console.log("comment deleted!");
      })
      .catch(error => console.log("ERROR deleting ", error));
    // this.props.history.push("/dashboard");
  }

  render() {
    console.log("state of edit button", this.state.showEditAndDelete);
    const { text } = this.state;
    const issues = this.props.issues;

    const { username } = this.state.user;

    return (
      <div className="container ">
        <div className=" issue-heading">

          List of Bugs 
        </div>

        {issues.map((issue, i) => (
          <div className="issue-main" key={i}>
        <p className="bug-text">Title: {issue.name}</p>
         <p className="bug-text">
              Description: {issue.description} </p>
            <Comment issue_id={issue.id} />
         
          </div>
        ))
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
