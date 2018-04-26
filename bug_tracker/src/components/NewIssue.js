import React, { Component } from "react";
import axios from "axios";

export default class NewIssue extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      posted_by: ""
    };
    this.title = this.title.bind(this);
    this.description = this.description.bind(this);
    this.createIssue = this.createIssue.bind(this);
    this.clearForm=this.clearForm.bind(this);
  }

  title(event) {
    this.setState({ title: event.target.value });
    console.log("title is ", this.state.title);
  }
  description(event) {
    this.setState({ description: event.target.value });
    console.log("description is ", this.state.description);
  }

  createIssue() {
    const { title, description } = this.state;

    var last_updated = new Date();
    console.log("inside createpost", { description, title });
    axios
      .post("/api/issue/create", { description, title, last_updated })
      .then(response => {this.setState({ comments: response.data });

      }).catch(console.log("error"))
      this.clearForm();
    
  }
  clearForm(){
    this.setState({
      title: "",
      description: "",
      posted_by: ""
    });
    alert('Thank you for Creating a new Issue on Bug Tracker!!')
}

  render() {
    return (
      <div>
        <p> inside newissue </p>

        <label>
          Title
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
            placeholder="Enter Issue Description"
            value={this.state.description}
            onChange={this.description}
          />
        </label>
        <br />
        <button> Preview </button>
        <br />

        <button onClick={() => this.createIssue()}> Submit a Issue </button>
        <br />
       
        {/* <div>
                            <p>Title {this.state.title} </p>
                            <p> Description {this.state.description} </p>
                            </div> */}
      </div>
    );
  }
}
