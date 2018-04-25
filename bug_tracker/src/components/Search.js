import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchIcon from "react-icons/lib/md/search";

const StyledSearch = styled.div`
height: 100%;
    // display: flex;
    // align-items: center;
    margin: 0px 10px;

    `
    const SearchText = styled.input`
    border-radius: 21px;
    border: 1px solid #2aabe2;
    outline: none;
    padding: 9px 34px 8px 12px;
    font-size: 12px;
    color:green;
    `
    const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const SearchResult = styled.div`
font-size: 20px;
position: absolute;
top: 6px;
right: 12px;
cursor: pointer;
 position: relative;
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
        console.log("search parameter is ",text);
        axios.get(`/api/issue?search=${text}`).then(response => {
          this.setState({ searchedIssue: response.data });
          console.log(response.data);
        });
       
      }
    render() {
         const {text } = this.state;

        return (
            <StyledSearch>
                <SearchText
          placeholder="search.."
          value ={text}
          onChange={this.updateText}>
         
          </SearchText>
    
          <Button primary  onClick={() =>this.searchIssue()}> Go 
          </Button>
          <SearchResult>
        <p> The searched Issue is :</p> 
        {this.state.searchedIssue.map((search,i)=>{
            return(
          <div key ={i}>
          <p> Title {search.name}</p>
          <p> Description {search.description} </p>
          <p> Last updated {search.last_updated} </p>
          </div>)
          
        })} 
        </SearchResult>
       

                </StyledSearch>


            
        );
    }
}