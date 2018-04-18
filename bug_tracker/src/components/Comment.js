import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import dataCreator from './dateCreator';

import FaTrash from 'react-icons/lib/fa/trash';
import FaPencil from 'react-icons/lib/fa/pencil';
export default class Comment extends Component {
    constructor(props){
        super(props)
            this.state ={
                text:'',
                description:'',
                comments :[],
                username:'',
                editting:false

            
        }
        this.updateText = this.updateText.bind(this);
        this.createComment = this.createComment.bind(this);
        // this.edit = this.edit.bind(this);
    }


    updateText(event){
        this.setState({description:event.target.value});
        console.log(this.state.description);
    }
    handleChange(event)
    {
        this.setState({text:event.target.value})
    }
    // edit(event){
    //     const{description} = this.state;
    //     const {issue_id}=this.props;
    //     if(event.key ==="Enter" && description.length!==0){
    //         edit(id, description);
    //         this.setState({editting:false});
    //     }
    // }



    createComment() 
        {
     
            const {description} = this.state;
           const {issue_id}=this.props;
            console.log("inside createpost", {description},{issue_id})
             axios.post('/api/comment',{description, issue_id}).then( response => {
                 console.log("inside create" , response.data);
               this.setState({comments: response.data });
               console.log(this.state.comments);
           
             });
           }

    

    render() {
        // const {editting}=this.state;
        return(
        <div>
            <input className='info-box'
             placeholder ="Give your thoughts!!"
            value = {this.state.description}
            onChange={this.updateText}/>

                       <button onClick ={this.createComment}> Comment </button>
                       {/* <button > Edit Comment </button> */}
            </div>

    
            
        );
    }
}