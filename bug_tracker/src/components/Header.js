import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import styled from 'styled-components';

const Wrapper = styled.div`
height:100px;
width:50%;
min-width:360px;
background-color:back;
box-shadow:box-shadow: 1px 2px 5px rgba(0,0,0,0.45);
&:hover{
  curser:pointer
}
@media(max-width: 739px){
  width:100%;
}

`
const InnerBox = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  background-color: white;
  height: 100%;
  justify-content: space-between;
  `
  




export default class Header extends Component {
constructor(){
  super();
  this.state ={
    userDetail:'',

  }
}
  componentDidMount(){
  axios.get("/api/session").then(response => {
    console.log("inside header user data", response.data);
    this.setState({ userDetail: response.data });
    
  });
}
logout = () => {
  axios.post('/api/logout').then(response => {
      if(response.data === "logged out"){
          window.location.href = '/'
      }
  })
}





  render() {
    return (
  
      <Wrapper>
        <Link to="/signup">Register</Link>
        <div className="navbar-container">

        {this.state.userDetail.username === 'admin'
      ?
      <div>
                            <Link to="/admin"> Admin Dashboard</Link>
                            
                            <Link to = "/" onClick={()=>this.logout()}> Log out </Link>
                            <Profile />
                            </div>

         :
             
         <div>
        
                            <Link to="/">Login</Link>
                            <Link to="/dashboard">Dashboard</Link>
          
                            <Link to="/issue" > Create New Issue </Link> 
                            <Link to = "/" onClick={()=>this.logout()}> Log out </Link>
                            <Profile />
                        
         </div>

    }
                        
                  </div>

      </Wrapper>

   
    )
  }
}