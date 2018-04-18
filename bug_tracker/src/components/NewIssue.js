import React, { Component } from 'react';
import axios from 'axios';

export default class NewIssue extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            description:'',
            posted_by:''

        }
        this.title = this.title.bind(this);
        this.description = this.title.bind(this);
    }


    title(event){
        this.setState({title:event.target.value});
    }
    description(event){
        this.setState({description:event.target.value});
    }

    // createIssue() 
    //     {
     
    //         const {title,description} = this.state;
    //         console.log("inside createpost", {description, title})
    //          axios.post('/api/issue/create',{description, issue_id}).then( response => {
    //              console.log("inside create" , response.data);
    //            this.setState({comments: response.data });
    //            console.log(this.state.comments);
           
    //          });
    //        }
    render() {
        return (
            <div>
                <p> inside newissue </p>
                 <form>
                 <label >Title 
                        <input
                        name=" Title"
                        placeholder="Enter Title"
                       
                        value={this.state.title}
                        onChange={this.title}
                        />
                        </label>
                        <br />

                         <label>
                         Issue Description:
                        <textarea 
                        name="Description"
                        placeholder = "Enter Issue Description"
                        value={this.state.description} 
                        onChange={this.description} />
                        </label>
                        <button > Submit a Issue </button>
                        <button> Preview </button>
                        
                   </form>     
                </div>

        );
    }
}