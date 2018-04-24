import React, { Component } from 'react';
import axios from 'axios';
import {Bar, Pie} from 'react-chartjs-2';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import './../style/Sidenav.css'


export default class AdminDashboard extends Component {
    constructor(){
        super();
        this.state = {
            users:[],
          comments:[],
          issues:[],
          issueCount:[],
          commentCount:[],
          commentCountByIssue:[],
          IssuePerUSer:{},
          CommentPerUser:{},
          CommentPerIssue:{}
       
        }

        this.getComment = this.getComment.bind(this);
        this.getIssue = this.getIssue.bind(this);
        this.logout = this.logout.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        console.log("inisde mount");
        // axios.get("/api/admin/issuecount").then(response => {
        //   this.setState({ issueCount: response.data });
        //   console.log("issue count is ",this.state.issueCount)
        // });
        axios.get("/api/admin/issuecount").then(res => {
            
            const issue=res.data;
            let username=[];
            let issueCount = [];
            issue.forEach(element =>{
                username.push(element.username);
                issueCount.push(element.issue_count);
            });
            this.setState({
                IssuePerUSer:{
                    labels: username,
                   datasets: [
                       {
                           label: 'Issue created by each user',
                           data:issueCount,
                           backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)' ],
                           borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)'   ],
                           borderWidth: 1  
                    }]
                },
                
            });
        })
        axios.get("/api/admin/commentcount").then(res => {
           
            const comment=res.data;
            let posted_by=[];
            let commentCount = [];
            comment.forEach(element =>{
                posted_by.push(element.posted_by);
                commentCount.push(element.comment_count);
            });
            this.setState({
                CommentPerUser:{
                    labels: posted_by,
                   datasets: [
                       {
                           label: 'Issue created by each user',
                           data:commentCount,
                           backgroundColor: ['rgba(255, 206, 86, 0.2)',
                           'rgba(75, 192, 192, 0.2)',
                           'rgba(153, 102, 255, 0.2)',
                           'rgba(255, 159, 64, 0.2)'],
                           borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)'   ],
                           borderWidth: 1  
                    }]
                },
                
            });
        });
        axios.get("/api/admin/issuecomment").then(res => {
            console.log("Comment by issue", res.data);
            const commentbyIssue=res.data;
            let Issue_id=[];
            let commentCount = [];
            commentbyIssue.forEach(element =>{
                Issue_id.push(element.issue_id);
                console.log(Issue_id);
                commentCount.push(element.comment_count);
            });
            this.setState({
                CommentPerIssue:{
                    labels: Issue_id,
                   datasets: [
                       {
                           label: 'Comment Per Issue ',
                           data:commentCount,
                           backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360" ],
                           hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"],
                           borderWidth: 1  
                    }]
                },
                
            });
          });
      }

    getComment() {
        axios.get('/api/admin/comment').then(response => {
          this.setState({ comments: response.data });
          console.log("Inside admin",this.state.comments);
        });
    }

    getUsers(){
        axios.get('/api/admin/users').then(response => {
            this.setState({ users: response.data });
            console.log("Inside admin",this.state.users);
          });

    }

     getIssue() {
        axios.get('/api/admin/issue').then(response => {
            this.setState({issues: response.data });
            console.log("Inside admin issues are ",this.state.issues);
          });
        }

        logout = () => {
            axios.post('/api/logout').then(response => {
                if(response.data === "logged out"){
                    window.location.href = '/'
                }
            })
          }
       
        
    render() {
        const issueList = (<table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Posted By</th>
                <th>Last Updated</th>
            </tr>
            {this.state.issues.map((issue, i) => {
                return (
                    <tr>
                        <td>{issue.issue_title}</td>
                        <td>{issue.description}</td>
                        <td>{issue.posted_by}</td>
                        <td>{issue.last_updated}</td>
                    </tr>
                );
            })}

            </table>);

            const commentList = (<table>
                <tr>
                    <th>Issue_id</th>
                    <th>Issue_title</th>
                    <th>Comment</th>
                    <th>Comment_by</th>
                </tr>
                {this.state.comments.map((comment, i) => {
                    return (
                        <tr>
                            <td>{comment.issue_id}</td>
                            <td>{comment.issue_title}</td>
                            <td>{comment.comment}</td>
                            <td>{comment.posted_by}</td>
                        </tr>
                    );
                })}

                </table>);
        return (


    <div>
    <div className="nav-side-menu">
    <div className="profile-pic">Admin pic</div>
    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
    <div className="menu-list">
        <ul id="menu-content" className="menu-content collapse out">
           
            <li data-toggle="collapse" data-target="#products" className="collapsed active">
                <a href="#"><i className="fa fa-line-chart"></i> Charts <span className="arrow"></span></a>
            </li>
            <ul className="sub-menu collapse" id="products">
                <li > <a data-toggle="collapse" href="#CommentByUSer" >Comment posted by users </a></li>
                <li><a data-toggle="collapse" href="#IssueByUser" >Issue posted by User</a></li>
                <li><a data-toggle="collapse" href="#CommentByIssue">Comment on issues</a></li>
                
            </ul>
            
            <li>
                <div data-toggle="collapse" data-target ="#UserData" onClick = {this.getUsers}> 
                    <i className="fa fa-users fa-lg"></i> Users
               </div>
            </li>
            <li>
                <div onClick={()=>{console.log("email comp")}}>
                <i class="fa fa-envelope"></i> Email
                </div>
            </li>
            <li>
            <button className="btn btn-primary"  data-toggle="collapse" data-target="#issue" onClick ={this.getIssue}>Get All the Issue </button>
            </li>

            <li>
            <button className="btn btn-primary" data-toggle="collapse" data-target="#comment"  onClick ={this.getComment}> Get All the Comment </button>
                </li>
                <li>
            {/* <button className="btn btn-info"  onClick ={this.logout}> Log Out </button> */}
            <Link to = "/" onClick={this.logout}> <i class="fa fa-sign-out"></i>Log out </Link>
                </li>

            
        </ul>
    </div>
</div>
<div className="container" id="main">
    <div className="row">
        <div className="col-md-12">
            <div className="collapse" id="issue">
            <h1> List of Issues </h1>

        {issueList}
    </div>
 
       <div className="collapse" id="comment">
       <h1> List of Comments </h1>
    
        {commentList}   
    </div>


        </div>
        
        <div className="collapse" id="IssueByUser">
        <h1> Issue count by each User</h1>
                <Pie data={this.state.IssuePerUSer}
                options={{ maintainAspectRatio: false }} />
                </div>

                <div className="collapse" id="CommentByUSer">
                <h1> Comment Posted by Each user </h1>
            
                <Bar data={this.state.CommentPerUser}
                options={{ maintainAspectRatio: false }} />
                </div>

                  <div className="collapse" id="CommentByIssue" >
            <h1> Comment Count Per Issue Id </h1>
            <Bar data={this.state.CommentPerIssue}
            options={{ maintainAspectRatio: false }} />
            </div> 


            <div>
            <div className ="collapose" id="UserData">
                <h1> List of Users </h1>
                {this.state.users.map((user,i) =>{
                    return(
                        <div key={user.id}>
                        
                        <li> Profile pic: {user.profile_pic} </li>
                        <li> Username: {user.username} </li>
                        <li> Email: {user.email} </li>
                    </div>
                    )
                })
                }
                </div>
                </div>


            
                </div>



</div>

    
</div>







            

        );
    }
}