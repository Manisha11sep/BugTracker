import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchIcon from "react-icons/lib/md/search";
import './../style/SearchStyle.css';

const StyledSearch = styled.div`
height: 100%;
display: flex;
align-items: center;
margin: 0px 10px;

    `
    const SearchText = styled.input`
    border-radius: 21px;
    border: 1px solid #2aabe2;
    outline: none;
    padding: 9px 34px 8px 12px;
    font-size: .8em;
    `
    const Button = styled.button`


  font-size: 20px;
  margin: 1em;
  padding: 0.25em 1em;

`;

const SearchHeading = styled.h3`
  font-size: 20px;
  color: white;
  text-align: center;
  padding:20px 25px;
`;
const SearchResult = styled.div`
font-size: 20px;
position: absolute;
top: 6px;
right: 12px;
cursor: pointer;
 position: relative;
 margin:5% 5%;
`

export default class Search extends Component {
    constructor(){
        super()
            this.state ={
                text:'',
                searchedIssue: [],
            }
            this.searchIssue = this.searchIssue.bind(this);
            this.updateText = this.updateText.bind(this);
        
    }
    updateText(event) {
        this.setState({ text: event.target.value });
        console.log(this.state.text);
      }
    searchIssue() {
        const { text } = this.state;
        {this.searchedIssue=''}
        if(text.length!=0){
        console.log("search parameter is ",text);
        axios.get(`/api/issue?search=${text}`).then(response => {
            console.log(response.data);
          this.setState({ searchedIssue: response.data });
          console.log(response.data);
        });
    }
        else{
            alert("Please enter something to search");

        }
    
       
      }
    render() {
         const {text } = this.state;

        return (
            <div className="search-background">
            <div className="container">
  
            <div className ="email-box">
            {/* <StyledSearch> */}
                <SearchText className=""
          placeholder="Enter something to search.."
          value ={text}
          onChange={this.updateText}>
         
          </SearchText>
    
          <button className="filter-button btn btn-info btn-lg" onClick={() =>this.searchIssue()}>
          <span class="glyphicon glyphicon-search"></span> Search
          </button>
          </div>
         
      
        {(this.state.searchedIssue.length!=0)
        ?
        <div>
        {this.state.searchedIssue.map((search,i)=>{
            return(
            
                <div className="issue-main" key ={i}>
                
       <p className="bug-text"> <b>Title: </b> {search.name}</p>
       <p className="bug-text"><b> Description</b> {search.description} </p>
       <p className="bug-text"><b>Last updated</b> {search.last_updated} </p>
          </div>
    
          
          )
          
        })} 
        </div>
        :

           <SearchHeading>
         <p className="bug-text"> <b>No Results!!</b> </p>
</SearchHeading>
    }
       

    </div>         
</div>

            
        );
    }
}