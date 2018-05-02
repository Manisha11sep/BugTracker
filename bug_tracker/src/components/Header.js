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
  height: 70px;
  width: 100%;
  min-width: 360px;
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	align-content: center;





  background-color:#001f3f;
  border-radius: 5px;
  @media (max-width: 739px) {
    width: 100%;
  }
`
const InnerBox = styled.div`


color: #f2f2f2;
padding: 14px 16px;
text-decoration: none;
font-size: 17px;
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
      <div className ="flex-container header-parent ">
   
 
        { (this.state.user.username!=='admin')
       ?  <Wrapper>
        <InnerBox> <Link to="/home">Home</Link>   </InnerBox>
        <InnerBox> <Link to="/dashboard">Dashboard</Link> </InnerBox>  
        <InnerBox><Link to="/issue" > New Issue </Link> </InnerBox>
        <InnerBox> <Link to="/search">Search</Link></InnerBox>
        <InnerBox> <Link to = "/" onClick={()=>this.logout()}> Log out </Link></InnerBox>
        </Wrapper>
      :
      null
       }          

 
 
       </div>

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