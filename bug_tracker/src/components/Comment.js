import React, { Component } from "react";
import axios from "axios";
import {connect} from 'react-redux';
import {writeComment,userDetail} from './../ducks/reducer';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      description: "",
      commentList: [],
      username: "",
      editing: false,
      showMasterMenu: false
    };
    this.createComment = this.createComment.bind(this);
    this.loadcomments = this.loadcomments.bind(this);
    this.checkIfUserCanEdit = this.checkIfUserCanEdit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }
    createComment() {
        const { description } = this.props;
        const { issue_id } = this.props;
        console.log("inside createpost", { description }, { issue_id });
        axios.post("/api/comment", { description, issue_id }).then(response => {
        this.setState({ comments: response.data });
        alert('Comment is posted!!');
        });
    }

    
  loadcomments() {
    const { issue_id } = this.props;
    axios.get(`/api/comment/${issue_id}`).then(response => {
      this.setState({ commentList: response.data });
      console.log(this.state.comments);
    });
  }
  checkIfUserCanEdit(comment){
    console.log(this.props.username);
      return this.props.username === comment.posted_by;
    }
    deleteComment(id){
      console.log("in delete post" +id);
      axios.delete(`/api/comment/${id}`).then(results =>{
        this.setState({message: results.data});
      })
    }
    
    
    
    editComment(posted_by){
      axios.post(`/api/comment${posted_by},{description}`).then(respnose=>{
        this.setState({})
      }).catch(error=>console.log("Error while editing", error));
    
    }
  
    //This put the post into Edit mode when the Edit button is pressed 
    // showEdit(){
    //     this.setState({editing:true ,showMasterMenu : false});
    // }

    //This put the post back into normal view mode when the cancel button is clicked
    // This method is passed to the <Edit /> componenet via props
    // hideEdit(){
    //     this.setState({editing:false})
    // }


    //This toggle the drop-down when the we click on right corner of edit 
    // toggleMasterMenu(){
    //     this.setState({showMasterMenu: !this.state.showMasterMenu});
    // }

    //This hide the drop down when post is clicked anywhere
    // hideMasterMenu(){
    //     if(this.state.showMasterMenu ===true){
    //         this.setState({showMasterMenu: false});

    //     }
    // }

  render() {
   //   Extracting writeComment function from the props from Reducer
    const {writeComment} = this.props;
    const {editing,showMasterMenu} = this.state;
    return (
      <div>
        
        <input className="info-box"
          placeholder="Give your thoughts!!"
          type="text"
          onChange={(e)=> writeComment(e.target.value)}
        />

        <button onClick={this.createComment}> Comment </button>
        <button onClick={this.loadcomments}>
                Load comments
              </button>
            <div>
                 {this.state.commentList.map((comment, i) => {
                     return(
                  <div className="comment-box" key={i}>
                    <p>Issue_ID: {comment.issue_id} Posted by:- {comment.posted_by} </p>
                    <p>Comment:- {comment.description}</p>
                    { this.checkIfUserCanEdit(comment) 
                    ? 
                    <div>
                      <button type="button" className="btn btn-secondary" onClick={this.editComment(comment.posted_by)}> Edit </button>
                      <button type="button" className="btn btn-secondary" onClick={(() =>this.deleteComment(comment.id))}>Delete Your comment</button>
                    </div>
                      : null 
                      }
                       <button> Hide Comment </button>
                  </div>

                 
                  );
                })
              }
              
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
  writeComment
};

export default connect(mapStateToProps, mapDispatchToProps) (Comment);