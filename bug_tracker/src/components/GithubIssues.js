import React, { Component } from 'react';
import axios from 'axios';

export default class GithubIssues extends Component {
    constructor(){
        super();
        this.state ={
            githubissue:[]
        }

    }
    componentDidMount(){

        // {transformResponse:[function(data){
        //     data.splice(10,0);
        //     return data;

        // }]
        axios.get('https://api.github.com/repos/hadley/dplyr/issues').then(response =>{
            this.setState({githubissue: response.data})
            console.log(this.state.githubissue);
        })
    }
    render() {
        
        return (
            
            <div>

            {this.state.githubissue.map((issue,i)=>{
                return(
                <div  className="box"key={i}> 
        <p className="bug-text"><b>Title: </b>{issue.title} </p>
          <p className="bug-text"><b>Issue Url:</b><a href={issue.url}> {issue.url}</a></p>
          <p className="bug-text"><b>Comment Url:</b>{issue.comments_url} </p>
          <p className="bug-text"><b>Issue id:</b> {issue.id} </p>
          <p className="bug-text"><b>State: </b>{issue.state}</p>
          <p className="bug-text"><b> Posted by:</b>{issue.user.login} </p>



                </div>
                )

            })}
            </div>

        );
    }
}