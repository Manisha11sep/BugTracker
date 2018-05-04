
import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

export default class Charts extends Component {
    constructor(props){
        super();
        this.state ={
            IssuePerUSer: {},
            CommentPerUser:{},
            CommentPerIssue:{}

        }
    }
        componentDidMount() {
        axios.get("/api/admin/issuecount").then(res => {
            const issue = res.data;
            let username = [];
            let issueCount = [];
            issue.forEach(element => {
              username.push(element.username);
              issueCount.push(element.issue_count);
            });
            this.setState({
              IssuePerUSer: {
                labels: username,
                datasets: [
                  {
                    label: "Issue created by each user",
                    data: issueCount,
                    backgroundColor: [
                      "#F7464A",
                      "#58D68D",
                      "#F5B041",
                      "#A569BD",
                      "#4D5360"
                    ],
                    borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
                    borderWidth: 1
                  }
                ]
              }
            });
          });
          axios.get("/api/admin/commentcount").then(res => {
            const comment = res.data;
            let posted_by = [];
            let commentCount = [];
            comment.forEach(element => {
              posted_by.push(element.posted_by);
              commentCount.push(element.comment_count);
            });
            this.setState({
              CommentPerUser: {
                labels: posted_by,
                datasets: [
                  {
                    label: "Issue created by each user",
                    data: commentCount,
                    backgroundColor: [
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
                    borderWidth: 1
                  }
                ]
              }
            });
          });
          axios.get("/api/admin/issuecomment").then(res => {
            console.log("Comment by issue", res.data);
            const commentbyIssue = res.data;
            let Issue_id = [];
            let commentCount = [];
            commentbyIssue.forEach(element => {
              Issue_id.push(element.issue_id);
              console.log(Issue_id);
              commentCount.push(element.comment_count);
            });
            this.setState({
              CommentPerIssue: {
                labels: Issue_id,
                datasets: [
                  {
                    label: "Comment Per Issue ",
                    data: commentCount,
                    backgroundColor: [
                      "#F7464A",
                      "#46BFBD",
                      "#FDB45C",
                      "#949FB1",
                      "#4D5360"
                    ],
                    hoverBackgroundColor: [
                      "#FF5A5E",
                      "#5AD3D1",
                      "#FFC870",
                      "#A8B3C5",
                      "#616774"
                    ],
                    borderWidth: 1
                  }
                ]
              }
            });
          });
        


    }


    render() {
        const {chartType} = this.props;
        return (
            <div>
               {
                    chartType ==='issue'
                ?     
                    <div>
                    <h1> Issue count by each User</h1>
                    <Pie
                        data={this.state.IssuePerUSer}
                        options={{ maintainAspectRatio: false }}
                    />
                    </div>
                :

                    null
                }

               { 
                     chartType ==='comment'
                ?
                    <div>
                        <h1> Comment Posted by Each user </h1>
                        <Bar
                        data={this.state.CommentPerUser}
                        options={{ maintainAspectRatio: false }}/>
                    </div>
                :
                       null
               }

                {
                     chartType ==='commentonissue'
                ?     

                    <div >
                    <h1> Comment Count Per Issue Id </h1>
                    <Bar
                        data={this.state.CommentPerIssue}
                        options={{ maintainAspectRatio: false }}
                    />
                    </div>
                :
            null
}


           </div>
                
        );
    }
}