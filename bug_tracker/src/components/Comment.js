import React, { Component } from "react";
import axios from "axios";
import {connect} from 'react-redux';
import {writeComment} from './../ducks/reducer';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      description: "",
      comments: [],
      username: "",
      editing: false,
      showMasterMenu: false
    };
    this.createComment = this.createComment.bind(this);
  }
    createComment() {
        const { description } = this.props;
        const { issue_id } = this.props;
        console.log("inside createpost", { description }, { issue_id });
        axios.post("/api/comment", { description, issue_id }).then(response => {
        console.log("inside create", response.data);
        this.setState({ comments: response.data });
        console.log(this.state.comments);
        });
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
        <input
          className="info-box"
          placeholder="Give your thoughts!!"
          type="text"
          onChange={(e)=> writeComment(e.target.value)}
        />

        <button onClick={this.createComment}> Comment </button>
        {/* <button > Edit Comment </button> */}
      </div>

    );
  }
}

function mapStateToProps( state ) {
    const { description } = state;
  
    return {
        description
    };
  }
  export default connect (mapStateToProps, {writeComment}) (Comment);