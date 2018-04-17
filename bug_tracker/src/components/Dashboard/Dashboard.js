import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(){
        super()
            this.state ={
                issues :[],

            
        }
    }

    componentDidMount() {
        console.log("inisde mount")
        axios.get('/api/issue/getAll').then(response => {

            this.setState({issues : response.data})
            console.log(this.state.issues[0].name);
        })
    }


    render() {
                return(
            <div>
                
                <h1> List of Issues is  </h1>
            {
                this.state.issues.map((issue,i) => (
                        <div key={i}>
                       <p>Issue Name: {issue.name}</p>
                       <p>Description: {issue.description}</p>
                       <p>Creater: {issue.creater_id}</p>
                       <p>Last Updated: {issue.last_updated}</p>
                  
                        </div>
                ))
            }
            </div>
      
        )
      }
      }
      