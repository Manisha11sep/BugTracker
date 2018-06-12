import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { userDetail, commentList } from "./../ducks/reducer";
import FaTrash from "react-icons/lib/fa/trash";
import FaPencil from "react-icons/lib/fa/pencil";
import EditComment from "./EditComment";
import "./../style/CommentStyle.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showComment: false,
      description: "",
      commentList: [],
      username: "",
      newComment: "",
      editting: false,
      editedText: ""
    };
    this.createComment = this.createComment.bind(this);
    this.loadcomments = this.loadcomments.bind(this);
    this.checkIfUserCanEdit = this.checkIfUserCanEdit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.edit = this.edit.bind(this);

    this.editComment = this.editComment.bind(this);
  }
  createComment() {
    const { description } = this.state;
    const { issue_id } = this.props;

    console.log("inside createpost", { description }, { issue_id });
    axios.post("/api/comment", { description, issue_id }).then(response => {
      console.log("resonpose ", response.data);
      this.setState({ commentList: response.data });
    });

    // this.loadcomments(issue_id);
    this.setState({ description: "" });
  }

  loadcomments() {
    const { issue_id } = this.props;
    axios.get(`/api/comment/${issue_id}`).then(response => {
      this.setState({ commentList: response.data });
      this.props.commentList(response.data);
      console.log(
        "inside load comment, list of comments",
        this.state.commentList
      );
    });
    this.setState({ showComment: !this.state.showComment });
    console.log("State of load comment", this.state.showComment);
  }

  checkIfUserCanEdit(comment) {
    console.log(this.props.username);
    return this.props.username === comment.posted_by;
  }
  deleteComment(id) {
    axios.delete(`/api/comment/${id}`).then(results => {
      this.setState({ message: results.data });
    });
    this.loadcomments();
  }
  handleChange(event) {
    this.setState({ editedText: event.target.value });
    console.log(this.state.editedText);
  }

  editComment(event, id) {
    const { editedText } = this.state;
    console.log("inside edit ", id);
    if (event.key === "Enter" && editedText.length !== 0) {
      axios
        .post(`/api/comment${id},{description}`)
        .then(respnose => {
          this.setState({ commentList: respnose.data });
        })
        .catch(error => console.log("Error while editing", error));
    }
  }

  render() {
    //   Extracting writeComment function from the props from Reducer
    const { editting, description, editedText } = this.state;
    console.log("state of edit", editting);
    return (
      <div className="comment">
        <div className="comment-container">
          <div>
            <input
              className="comment-textbox"
              value={description}
              placeholder="Write your comment here...."
              onChange={e => this.setState({ description: e.target.value })}
            />
          </div>
          <div>
            <button onClick={this.createComment}> Post</button>
          </div>

          <div className="load-comment">
            <button onClick={this.loadcomments}> Load </button>
          </div>
        </div>

        <div>
          {this.state.commentList.map((comment, i) => {
            return (
              <div key={i}>
                {this.checkIfUserCanEdit(comment) ? (
                  <div>
                    <EditComment
                      loadcommentsFN={this.loadcomments}
                      comment_id={comment.id}
                      description={comment.description}
                      issue_id={comment.issue_id}
                    />
                  </div>
                ) : (
                  <div className="Message__container">
                    <p className="bug-text">{comment.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  userDetail,
  commentList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
