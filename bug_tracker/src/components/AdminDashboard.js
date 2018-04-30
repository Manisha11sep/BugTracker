import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./../style/Sidenav.css";
import { connect } from "react-redux";
import { logout} from '../ducks/reducer'; 
import Profile from './Profile';
import Charts from './Charts';
class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      userdetail:[],
      users: [],
      comments: [],
      issues: [],
      issueCount: [],
      commentCount: [],
      commentCountByIssue: [],
      IssuePerUSer: {},
      CommentPerUser: {},
      CommentPerIssue: {},
      to:[],
      subject:'',
      body:'',
      issueState:false,
      emailState:false,
      open:'',
      chartType:''
    };

    this.getComment = this.getComment.bind(this);
    this.getIssue = this.getIssue.bind(this);
    this.logout = this.logout.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.onChange=this.onChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getIssueChart = this.getIssueChart.bind(this);
    this.getCommentChart=this.getCommentChart.bind(this);
    this.getCommentOnIssue=this.getCommentOnIssue.bind(this);
  }

  componentDidMount() {
    axios.get("/api/session").then(response => {
      console.log("inside header user data", response.data);
      this.setState({ userdetail: response.data });
      console.log("user deails", this.state.userdetail);
  
      
    });

    // axios.get("/api/admin/issuecount").then(res => {
    //   const issue = res.data;
    //   let username = [];
    //   let issueCount = [];
    //   issue.forEach(element => {
    //     username.push(element.username);
    //     issueCount.push(element.issue_count);
    //   });
    //   this.setState({
    //     IssuePerUSer: {
    //       labels: username,
    //       datasets: [
    //         {
    //           label: "Issue created by each user",
    //           data: issueCount,
    //           backgroundColor: [
    //             "rgba(255, 99, 132, 0.2)",
    //             "rgba(54, 162, 235, 0.2)"
    //           ],
    //           borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
    //           borderWidth: 1
    //         }
    //       ]
    //     }
    //   });
    // });
    // axios.get("/api/admin/commentcount").then(res => {
    //   const comment = res.data;
    //   let posted_by = [];
    //   let commentCount = [];
    //   comment.forEach(element => {
    //     posted_by.push(element.posted_by);
    //     commentCount.push(element.comment_count);
    //   });
    //   this.setState({
    //     CommentPerUser: {
    //       labels: posted_by,
    //       datasets: [
    //         {
    //           label: "Issue created by each user",
    //           data: commentCount,
    //           backgroundColor: [
    //             "rgba(255, 206, 86, 0.2)",
    //             "rgba(75, 192, 192, 0.2)",
    //             "rgba(153, 102, 255, 0.2)",
    //             "rgba(255, 159, 64, 0.2)"
    //           ],
    //           borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
    //           borderWidth: 1
    //         }
    //       ]
    //     }
    //   });
    // });
    // axios.get("/api/admin/issuecomment").then(res => {
    //   console.log("Comment by issue", res.data);
    //   const commentbyIssue = res.data;
    //   let Issue_id = [];
    //   let commentCount = [];
    //   commentbyIssue.forEach(element => {
    //     Issue_id.push(element.issue_id);
    //     console.log(Issue_id);
    //     commentCount.push(element.comment_count);
    //   });
    //   this.setState({
    //     CommentPerIssue: {
    //       labels: Issue_id,
    //       datasets: [
    //         {
    //           label: "Comment Per Issue ",
    //           data: commentCount,
    //           backgroundColor: [
    //             "#F7464A",
    //             "#46BFBD",
    //             "#FDB45C",
    //             "#949FB1",
    //             "#4D5360"
    //           ],
    //           hoverBackgroundColor: [
    //             "#FF5A5E",
    //             "#5AD3D1",
    //             "#FFC870",
    //             "#A8B3C5",
    //             "#616774"
    //           ],
    //           borderWidth: 1
    //         }
    //       ]
    //     }
    //   });
    // });
  }





  sendEmail(event)
  {
      console.log("inisde props", this.props);
      const{username,email,profile_pic}=this.props;
   const {to,subject,body} = this.state;
   console.log("inside email", to,subject,body)
    axios.post('/api/send-email',{to,subject,body,username,email}).then( response => {
        console.log("inside email" , response.data);
      this.setState({ messages: response.data });
    //   event.preventDefault();
  
    });

  }

  getComment() {
    axios.get("/api/admin/comment").then(response => {
      this.setState({ comments: response.data });
      console.log("Inside admin", this.state.comments);
    });
  }

  getUsers() {
    axios.get("/api/admin/users").then(response => {
      this.setState({ users: response.data, open:'users' });
      console.log("Inside admin", this.state.users);
    });
  }

  getEmail(){
    this.setState({open:'email'})
  }
  getIssueChart(){
    this.setState({open:'charts', chartType: 'issue'})
  }
  getCommentChart(){
    this.setState({open:'charts', chartType: 'comment'})
  }
  getCommentOnIssue(){
    this.setState({open:'charts', chartType: 'commentonissue'})
  }


  getIssue() {
    axios.get("/api/admin/issue").then(response => {
      this.setState({ issues: response.data, issueState:false });
      console.log("Inside admin issues are ", this.state.issues);
    });
  }

  logout = () => {
    axios.post("/api/logout").then(response => {
      if (response.data === "logged out") {
        window.location.href = "/";
      }
    });
  };

  onChange(e){
    this.setState({[e.target.name]:e.target.value});

}
  render() {
    console.log("issue state", this.state.issueState);
    const issueList = (
      <table>
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
      </table>
    );

    const commentList = (
      <table>
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
      </table>
    );
    return (
      <div className="admin-dashboard">
        <div className="nav-side-menu">
        <div className="panel panel-primary">
        <div className="panel-heading">Welcome</div>
        <div className="panel-body"><img className ="profile-pic"src={this.state.userdetail.profile_pic} /> </div>
        <div className="panel-footer">{this.state.userdetail.username}</div>

        </div>
          {/* <div className="profile-pic"> <img className="admin-img" /></div> */}
          <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"/>
          <div className="menu-list">
            <ul id="menu-content" className="menu-content collapse out">
            <button className="btn btn-primary"  data-toggle="collapse" data-target="#charts"  >
               
                  <i className="fa fa-line-chart" /> Charts 
             </button>

              <ul className="sub-menu collapse" id="charts">
                <li onClick ={this.getCommentChart}>
                  <a data-toggle="collapse" href="#CommentByUSer"> Comment posted by users </a>
                </li>
                <li onClick ={this.getIssueChart}>
                  <a data-toggle="collapse" href="#IssueByUser" >Issue posted by User </a>
           
                </li>
                 <li onClick ={this.getCommentOnIssue}>
                  <a data-toggle="collapse" href="#CommentByIssue"> Comment on issues</a>
                </li>
              </ul>

              <li>
              <button className="btn btn-primary"  data-toggle="collapse" data-target="#UserData" onClick={this.getUsers}>
                  <i className="fa fa-users fa-lg" /> Users
                </button>
              </li>
              <li>
              <button className="btn btn-primary"  onClick ={this.getEmail}>
                {/* <button className="btn btn-primary"  data-toggle="collapse" data-target="#Email" > */}
                  <i class="fa fa-envelope" /> Email
                </button>
              </li>
              <li>
                <button className="btn btn-primary" data-toggle="collapse" data-target="#issue" onClick={this.getIssue}>
                <i class="fa fa-exclamation-triangle" />  Get All the Bugs
                </button>
              </li>

              <li>
                <button
                  className="btn btn-primary" data-toggle="collapse" data-target="#comment" onClick={this.getComment}>
                  <i class="fa fa-comments" />  Get All the Comment
                </button>
              </li>
              <li>
                {/* <button className="btn btn-info"  onClick ={this.logout}> Log Out </button> */}
                <button className="btn btn-primary"> <Link to="/" onClick={this.logout}>
                  <i class="fa fa-sign-out" />Log out
                </Link>
                </button> 
              </li>
            </ul>
          </div>
        </div>
        <div>

        <div className="container" id="main">
        <h1> Welcome to the Bug Tracker </h1>
        

              <div className="collapse" id="issue">
                <h1> List of Issues/Bugs </h1> 
                 {issueList}
              </div>

              <div className="collapse" id="comment">
                <h1> List of Comments </h1>
                 {commentList}
              </div>

            {/* <div className="collapse" id="IssueByUser">
              <h1> Issue count by each User</h1>
              <Pie
                data={this.state.IssuePerUSer}
                options={{ maintainAspectRatio: false }}
              />
            </div> */}
            {this.state.open ==='charts'
            ?
            <Charts chartType ={this.state.chartType}/>
            :
            null
          }

            {/* <div className="collapse" id="CommentByUSer">
              <h1> Comment Posted by Each user </h1>
              <Bar
                data={this.state.CommentPerUser}
                options={{ maintainAspectRatio: false }}
              />
            </div>

            <div className="collapse" id="CommentByIssue">
              <h1> Comment Count Per Issue Id </h1>
              <Bar
                data={this.state.CommentPerIssue}
                options={{ maintainAspectRatio: false }}
              />
            </div> */}

            {this.state.open ==='users' 
            ?
            <Profile />
            // ?
            //   <div className="collapose" id="UserData">
            //    
            //       );
            //     })}

                
            //     </div>
                :
                null
              }
          
             
              {this.state.open ==='email' 
              ?
              <div className="collapose" id="Email">
        
                <div>
                    <label>Email address</label>
                    <input type="email" name ="to" value ={this.state.to}
                     onChange={this.onChange} placeholder="Enter email"/>
                </div>
                <div>
                    <label>Subject</label>
                    <input type="text" name ="subject" value ={this.state.subject}
                     onChange={this.onChange} placeholder="Enter Subject"/>
                </div>
                <div>
                    <label>Body</label>
                    <textarea name ="body" placeholder="Enter the message" value ={this.state.body}
                     onChange={this.onChange}/>
                </div>
               
                <button  className="btn btn-info" onClick ={this.sendEmail}> Send </button>
            
              </div> : 
              null
            }
          
          </div>
        </div>
        </div>
     
    );
  }
}
const mapStateToProps = state => {
    return state;
  };
  
  const mapDispatchToProps = {
   
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);