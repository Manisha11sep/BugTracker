import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import { connect } from "react-redux";
import { issueList, search ,userDetail} from "../ducks/reducer";
import SearchIcon from "react-icons/lib/md/search";
// import Profile from './Profile';
import Footer from './Footer';
import "./../style/DashboardStyle.css";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      text: '',
      comments: [],
      user: {},
      showEditAndDelete: false,
      message:[],

    };
    this.updateText = this.updateText.bind(this);
    // this.loadcomments = this.loadcomments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  
  }

  componentDidMount() {
    
    axios.get("/api/issue/getAll").then(response => {
      this.setState({ issues: response.data });
      this.props.issueList(response.data);
      console.log("inisde mount", this.state.issues);
      //   .catch(error => console.log(error));
    });
    // axios.get("/api/session").then(response => {
    //   console.log("inside axios session", response.data);
    //   this.setState({ user: response.data });
    //   this.props.userDetail(response.data);
    //   //   .catch(error => console.log(error));
    // });
  }

  updateText(event) {
    this.setState({ text: event.target.value });
    console.log(this.state.text);
  }

  // loadcomments(id) {
  //   axios.get(`/api/comment/${id}`).then(response => {
  //     this.setState({ comments: response.data });
  //     console.log(this.state.comments);
  //   });
  // }

  checkIfUserCanEdit(comment){
  console.log(this.props.username);
    return this.props.username === comment.posted_by;
  }

  deleteComment(id){
    console.log("delete  triggered", id)
    axios.post(`/api/comment/${id}`).then(res => {
        console.log('comment deleted!')
    }).catch(error => console.log("ERROR deleting ", error));
    // this.props.history.push("/dashboard");
} 
// deleteComment(id){
//   console.log("in delete post" +id);
//   axios.delete(`/api/comment/${id}`).then(results =>{
//     this.setState({message: results.data});
//   })
// }



// editComment(posted_by){
//   axios.post(`/api/comment${posted_by},{description}`).then(respnose=>{
//     this.setState({})
//   }).catch(error=>console.log("Error while editing", error));

// }



  render() {
    console.log("state of edit button", this.state.showEditAndDelete);
    const {text } = this.state;

    const{username}=this.state.user;


    // const comment = this.state.comments.map((comment, i) => {
    //   return(
    //   <div className="comment-box" key={i}>
    //     <p>Issue_ID: {comment.issue_id} Posted by:- {comment.posted_by} </p>
    //     <p>Comment:- {comment.description}</p>
    //     {this.checkIfUserCanEdit(comment) ? 
    //     <div>
    //       <button type="button" className="btn btn-secondary" onClick={this.editComment(comment.posted_by)}> Edit </button>
    //       <button type="button" className="btn btn-secondary" onClick={(() =>this.deleteComment(comment.id))}>Delete Your comment</button>
    //     </div>
    //       : null 
    //       }
    //       </div>
    //   );
    // });

    return (
      <div className="container ">
        <div className="listofbug">
          <h1> List of Bugs </h1>
          </div>
          <div className="row">
          {this.state.issues.map((issue, i) => (
            <div className="issue-main" key={i}>
              <p> Issue_ID :{issue.id}  Issue Title: {issue.name}</p>
              <p></p>
              <p>Description: {issue.description}</p>
              <p>User_ID: {issue.creater_id}</p>
              <p>Last Updated: {issue.last_updated}</p>
              {/* <button onClick={(() => this.loadcomments(issue.id))}>
                Load comments
              </button> */}
         
              {/* {comment} */}
          
              {/* {comment[0].issue_id == issue.id ? comment : null} */}
              <Comment issue_id={issue.id} />
              <Footer />
            </div>
          ))}
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
  issueList,
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
