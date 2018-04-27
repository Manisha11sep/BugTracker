import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import styled from 'styled-components';
import { connect } from "react-redux";
import {userDetail, logout} from '../ducks/reducer'; 
import Logo from './../Logo.jpg';

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  min-width: 360px;
  background-color:black;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.45);
  overflow:hidden;
  border-radius: 5px;
  margin: 5px 5px;
  text-align: center;
  &:hover{
    cursor:pointer;
    box-shadow: 1px 4px 5px rgba(0,0,0,0.45);
  }
  @media (max-width: 739px) {
    width: 100%;
  }
`
const InnerBox = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
 text-color:white
  margin: 0 auto;
  text-align: center;
  height: 100%;
  justify-content: space-between;
  `;

  const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  text-color:black;
`;


class Header extends Component {
constructor(){
  super();
  this.state ={
    user:'',

  }
}
  componentDidMount(){
  axios.get("/api/session").then(response => {
    console.log("inside header user data", response.data);
    this.setState({ user: response.data });
    // this.props.userDetail(response.data);
    
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
         {/* this.state.user.username === 'admin' */}
       
        <InnerBox>
           <Profile /> 
         <Link to="/dashboard">Dashboard</Link>
         <Link to="/issue" > Create New Issue </Link> 
         <Link to = "/" onClick={()=>this.logout()}> Log out </Link>
        
         </InnerBox>
      
       }          

     
        </Wrapper>


    )
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  userDetail,
};
export default connect(mapStateToProps, mapDispatchToProps) (Header);