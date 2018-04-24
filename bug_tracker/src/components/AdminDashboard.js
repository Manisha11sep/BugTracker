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
          comments:[],
          issues:[],
          issueCount:[],
          commentCount:[],
          commentCountByIssue:[],
       
        }

        this.getComment = this.getComment.bind(this);
        this.getIssue = this.getIssue.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        console.log("inisde mount");
        axios.get("/api/admin/issuecount").then(response => {
          this.setState({ issueCount: response.data });
          console.log("issue count is ",this.state.issueCount)
        });
        axios.get("/api/admin/commentcount").then(response => {
          console.log("commentCount", response.data);
          this.setState({ commentCount: response.data });

        //   this.props.userDetail(response.data);
          //   .catch(error => console.log(error));
        });
        axios.get("/api/admin/issuecomment").then(response => {
            this.setState({commentByIssue: response.data });
            //   .catch(error => console.log(error));
            console.log("commentByIssue", this.state.commentByIssue);
          });
      }

    getComment() {
        axios.get('/api/admin/comment').then(response => {
          this.setState({ comments: response.data });
          console.log("Inside admin",this.state.comments);
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
                <li > <a data-toggle="collapse" href="#barchart" >Comment posted by users </a></li>
                <li><a href="#">Issue posted by User</a></li>
                <li><a href="#">Comment on issues</a></li>
                
            </ul>
            
            <li>
                <a href="#">
                    <i className="fa fa-users fa-lg"></i> Users
                </a>
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

    <div className = "collapse" id="barchart" onClick= {<BarChart />}>
    <h1> BarChart </h1>
    <BarChart />

        </div>

        </div>
        


</div>

    
</div>
</div>






            

        );
    }
}