import React, { Component } from "react";
import './../style/MessageStyle.css';
import axios from 'axios'
import './../style/MessageStyle.css'

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

  }


  handleChange( event ) {
   
    this.setState({ editText: event.target.value });
    console.log("inside handle change",this.state.editText);
  }


  edit(event) 
  {
    const { editText } = this.state;
    const {comment_id} = this.props;

    if( event.key === "Enter" && editText.length !== 0 ) 
    {
      axios.put(`/api/comment/${comment_id}`,{editText}).then(response=>{
      this.setState({ message: response.data, editting: false });
      this.props.loadcommentsFN();
    });
    
  }

}

  deleteComment(id){
    console.log("inside delte");
    axios.delete(`/api/comment/${id}`).then(results =>{
      this.setState({message: results.data});
      this.props.loadcommentsFN();
    });
   
  }

  render() {
    const {comment_id,description} = this.props;
    const { editting, editText } = this.state;
  
    return (
      <div className="Message__container">
        {
          editting
          ?
            <input className="bug-text" value={editText} onChange={ this.handleChange } onKeyPress={ this.edit } />
          :
            <span className=" bug-text">{description}</span>
          
          
        }
        {/* <p>{description}</p> */}
        <span className="Message__edit" onClick={ () => this.setState({ editting: !this.state.editting, editText:description }) }> <FaPencil /> </span>
        <span className="Message__delete" onClick={ () => this.deleteComment(comment_id)}>  <FaTrash /> </span>
      </div>
    )
  }
}