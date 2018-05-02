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
        axios.get('https://api.github.com/repos/hadley/dplyr/issues',{limit: 10}).then(response =>{
            this.setState({githubissue: response.data})
            console.log(this.state.githubissue);
        })
    }
    render() {
        
        return (
            
            <div className="container">

            {this.state.githubissue.map((issue,i)=>{
                return(
                <div key={i}> 

            <li>Issue Title:{issue.body}  </li>
            <li>Comment Url :{issue.comments_url} </li>
            <li>Issue id: {issue.id} </li>
            <li>State: {issue.state}</li>
            <li> Posted by:{issue.user.login} </li>



                </div>
                )

            })}
            </div>

        );
    }
}