import React, { Component } from 'react';
import axios from 'axios';
import {Bar, Pie} from 'react-chartjs-2';
import BarChart from './BarChart';
import PieChart from './PieChart';

export default class AdminDashboard extends Component {
    constructor(){
        super();
        this.state = {
          comments:{},
          issue:{},
          issueCount:[],
          commentCount:[],
          commentCountByIssue:[],
            //         Data :{
            //   labels:['manisha','Tushar'],
            //   datasets:[
            //       {
            //           label: 'My first ',
            //           backgroundColor: 'rgba(255,99,132,0.2)',
            //           borderColor: 'rgba(255,99,132,1)',
            //           borderWidth: 1,
            //           hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            //           hoverBorderColor: 'rgba(255,99,132,1)',
            //           data: [5,10]
            //       }
            //   ]

        //   }
        }

        this.getComment = this.getComment.bind(this);
        this.getIssue = this.getIssue.bind(this);
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
            this.setState({issue: response.data });
            console.log("Inside admin",this.state.issue);
          });
        }
       
        
    render() {

        return (
            <div>
                <p>Inside Admin Comp

                    <button onClick ={this.getComment}> Get All the Comment </button>
                    <br />
                    <button onClick ={this.getIssue}> Get All the Issue </button>

                </p>
                <h1> BarChart</h1>
                <BarChart />
            {/* <PieChart /> */}
        
        <div>
        {/* <Pie
          data={this.state.Data}
          options={{maintainAspectRatio: false}}/> */}
     </div>

                </div>

        );
    }
}