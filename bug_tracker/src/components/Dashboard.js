import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';

export default class Dashboard extends Component {
    constructor(){
        super()
            this.state ={
                issues :[],
                text:'',

            
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


    render() {
                return(
            <div>
                <div>
                <button > sort </button>
                    
                       <button> Delete </button>
                    
                       </div>

                <h1> List of Issues is  </h1>
            {
                this.state.issues.map((issue,i) => (
                        <div key={i}>
                       <p>Issue Name: {issue.name}</p>
                       <p>Description: {issue.description}</p>
                       <p>Creater: {issue.creater_id}</p>
                       <p>Last Updated: {issue.last_updated}</p>
                       {/* <input className='info-box'
             placeholder ="Give your thoughts!!"
            value = {this.state.text}
            onChange={this.updateText}/>

                       <button> Comment </button> */}
                    <Comment />
                  
                        </div>
                ))
            }
            </div>
      
        )
      }
      }
      