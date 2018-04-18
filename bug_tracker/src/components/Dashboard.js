import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import Message from './Message';

export default class Dashboard extends Component {
    constructor(){
        super()
            this.state ={
                issues :[],
                text:'',
                comments:[]

            
        }
        this.updateText = this.updateText.bind(this);
    }

    componentDidMount() {
        console.log("inisde mount")
        axios.get('/api/issue/getAll').then(response => {

            this.setState({issues : response.data})
            console.log(this.state.issues[0].name);
        })
    }
    updateText(event){
        this.setState({text:event.target.value});
        console.log(this.state.text);
    }


    loadcomments(id){
        axios.get(`/api/comment/${id}`).then(response => {

                    this.setState({comments: response.data})
                    console.log(this.state.comments);
                })
    }

    render() {
        
         const comment= this.state.comments.map((comment,i) =>(
                <div key = {i}>
                <p>{comment.description}</p>
                <p>Posted by:{comment.posted_by} </p> 
                <p>Refered to Issue{comment.issue_id} </p>
                </div>
            ))
            
                return(
            <div>
                <div>
                <button > sort </button>
                    
                       <button> Delete </button>
                 
                       </div>
                <div>
                     <h1> List of Issues is  </h1>
                     {
                        this.state.issues.map((issue,i) => (
                            <div key={i}>
                            <p> Issue Id :{issue.id} </p>
                            <p>Issue Name: {issue.name}</p>
                            <p>Description: {issue.description}</p>
                            <p>Creater ID: {issue.creater_id}</p>
                            <p>Last Updated: {issue.last_updated}</p>
                            <button onClick ={() =>this.loadcomments(issue.id)}> Load comments </button>
                        {comment}
                             <Comment issue_id={issue.id}/>
                  
                          </div>
                       
                ))
            }

           
      

            </div>
            </div>
      
        )
      }
      }
              {/* <input className='info-box'
             placeholder ="Give your thoughts!!"
            value = {this.state.text}
            onChange={this.updateText}/>

                       <button > Comment </button> */}