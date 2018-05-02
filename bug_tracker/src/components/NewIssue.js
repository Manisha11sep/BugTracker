import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import './../style/NewIssueStyle.css';


const Heading = styled.div`
height:100px;
width:100%;
display:flex;
margin-bottom: 10%;


`;
const InnerBox = styled.div`

  margin: 0 auto;
  text-align: center;
  justify-content: space-between;
padding:20px 20px;

  `;
const IssueHeading = styled.h3`
  font-size: 20px;
  color: black;
  text-align: center;
  padding:20px 25px;
`; 



const IssueText = styled.input`
  border-radius: 21px;
  border: 1px solid #2aabe2;
  outline: none;
  padding: 9px 34px 8px 12px;
  font-size: 12px;
  color: green;
`;
const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => (props.primary ? "palevioletred" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
 margin:10% 10%;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

`;



export default class NewIssue extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      posted_by: "",
      files: []
    };
    this.createIssue = this.createIssue.bind(this);
    // this.clearForm=this.clearForm.bind(this);
  }

  createIssue() {
    const { title, description } = this.state;

    var last_updated = new Date();
    console.log("inside createpost", { description, title });
    axios
      .post("/api/issue/create", { description, title, last_updated })
      .then(response => this.setState({ title: "", description: "" }));

    alert("Thank you for Creating a new Issue on Bug Tracker!!");
  }

  render() {
    return (
  
      <div className="content">

        <IssueHeading>
          <p> Create a New Issue </p>
        </IssueHeading>
        {/* <IssueBox> */}
        <div className="box">
            <div className="issue-title">
                <div>
                    <label> Title </label>
                </div>
                <br />
                <div>
                  <input
                    name=" Title"
                    value={this.state.title}
                    placeholder="Enter Title"
                    onChange={event => this.setState({ title: event.target.value })}
                  />
                </div>
         
             </div>
            <div className="issue-title">
              <div>
                  <label> Issue Description: </label>
              </div>
              <div>
                  <textarea
                    name="Description"
                    value={this.state.description}
                    placeholder="Enter Issue Description"
                    onChange={event =>
                      this.setState({ description: event.target.value })
                    }
                  />
               </div>
                  
                    
            </div>
            <div>
            <Button color="red" onClick={() => this.createIssue()}>
          
          Submit a Issue
        </Button>
        </div>
            {/* </IssueBox> */}
            </div>

      
         
        

        </div>
           

    );
  }
}
