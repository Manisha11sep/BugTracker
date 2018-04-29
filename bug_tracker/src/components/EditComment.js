import React, { Component } from "react";
import './../style/MessageStyle.css';
import axios from 'axios'

import FaTrash from "react-icons/lib/fa/trash";
import FaPencil from "react-icons/lib/fa/pencil";

export default class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editting: false,
      commentList:[],
      description:'',
      message:'',
      editText:''
    };

    this.handleChange = this.handleChange.bind( this );
    this.edit = this.edit.bind( this );
    this.deleteComment = this.deleteComment.bind(this);
    // this.editComment=this.editComment.bind(this);
    this.loadcomments=this.loadcomments.bind(this);
  }


  handleChange( event ) {
   
    this.setState({ editText: event.target.value });
    console.log("inside handle change",this.state.editText);
  }

  loadcomments() {
    const { issue_id } = this.props;
    axios.get(`/api/comment/${issue_id}`).then(response => {
      this.setState({ commentList: response.data });
    
    });
  }
  edit(event) 
  {
    const { editText } = this.state;
    const {comment_id} = this.props;
    console.log("edited text and id", editText,comment_id);
    if( event.key === "Enter" && editText.length !== 0 ) 
    {
      axios.put(`/api/comment/${comment_id}`,{editText}).then(response=>{
      this.setState({ message: response.data, editting: false });
    
    });
    
  }

}

  deleteComment(id){
    console.log("inside delte");
    axios.delete(`/api/comment/${id}`).then(results =>{
      this.setState({message: results.data});
    });
    // this.loadcomments();
  }

  render() {
    console.log("inside edit props are", this.props);
    const {comment_id,description} = this.props;
    const { editting, editText } = this.state;
    console.log("Value of editing button", editting);
    return (
      <div className="Message__container">
        {
          editting
          ?
            <input className="Message__input" value={editText} onChange={ this.handleChange } onKeyPress={ this.edit } />
          :
            <span className="Message__text">{description}</span>
          
          
        }
        {/* <p>{description}</p> */}
        <span className="Message__edit" onClick={ () => this.setState({ editting: !this.state.editting, editText:description }) }> <FaPencil /> </span>
        <span className="Message__delete" onClick={ () => this.deleteComment(comment_id)}>  <FaTrash /> </span>
      </div>
    )
  }
}