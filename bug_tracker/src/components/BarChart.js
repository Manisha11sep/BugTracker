import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

export default class BarChart extends Component {
    constructor(){
        super();
        this.state ={
            Data:{},

        }
    }
    componentDidMount() {
        console.log("inisde mount");
        axios.get("/api/admin/issuecount").then(res => {
            const issue=res.data;
            let username=[];
            let issueCount = [];
            issue.forEach(element =>{
                username.push(element.username);
                issueCount.push(element.issue_count);
            });
            this.setState({
                Data:{
                    labels: username,
                   datasets: [
                       {
                           label: 'Issue created by each user',
                           data:issueCount,
                           backgroundColor:[
                            'rgba(255,105,145,0.6)',
                            'rgba(155,100,210,0.6)',
                            'rgba(90,178,255,0.6)',
                            'rgba(240,134,67,0.6)',
                            'rgba(120,120,120,0.6)',
                            'rgba(250,55,197,0.6)'
                         ]},
                   ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

        //   this.setState({ issueCount: response.data });
        //   console.log("issue count is ",this.state.issueCount)
        })
    }

    render() {
        return (
            
            <div>
            
                <Bar data={this.state.Data}
                options={{ maintainAspectRatio: false }} />
                </div>
        
        );
    }
}