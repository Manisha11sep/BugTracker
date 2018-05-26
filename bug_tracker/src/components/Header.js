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
    background-color: #222222;
    position:fixed;
   font-size: 12px;
   font-weight: normal;
   right: 0;
   bottom: 0;
   left: 0;
   background-color: black;
   margin: 0 auto !important;
 text-align: center !important;
 width: 100% !important;
 @media (min-width: 765px) {
    // height:70px;
 }
 `
const InnerBox = styled.div`

color: #f2f2f2;
text-decoration: none;
font-size: 25px;
-webkit-transition: margin-left 0.3s ease-in-out;
  -o-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 100px;
  border: none;
  min-height: 50px;

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
    navbar:true

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
burgerToggle= ()=>{

 this.setState({navbar:false})
}

  render() {
 
    return (
      <div>
   
 
        { (this.state.user.username!=='admin')
       ?
       
       
       <nav class="navbar navbar-expand-lg ">
       
  <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <i
              className="fa fa-bars fa-2x toggle-btn"
              data-toggle="collapse"
              data-target="#navbarNav"
            />
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class=" active">
      <InnerBox> <Link to="/home">Home</Link>   </InnerBox>
      </li>
      <li class="">
      <InnerBox> <Link to="/dashboard">Dashboard</Link> </InnerBox> 
      </li>
      <li class="">
      <InnerBox><Link to="/issue" > New Issue </Link> </InnerBox>
      </li>
      <li class="">
      <InnerBox> <Link to="/search">Search</Link></InnerBox>
      </li>
    
      <li class="">
      <InnerBox> <Link to = "/" onClick={()=>this.logout()}> Log out </Link></InnerBox>
      </li>

    </ul>
  </div>
</nav>
        //  <Wrapper>
        // <InnerBox> <Link to="/home">Home</Link>   </InnerBox>
        // <InnerBox> <Link to="/dashboard">Dashboard</Link> </InnerBox>  
        // <InnerBox><Link to="/issue" > New Issue </Link> </InnerBox>
        // <InnerBox> <Link to="/search">Search</Link></InnerBox>
        // <InnerBox> <Link to = "/" onClick={()=>this.logout()}> Log out </Link></InnerBox>
        // </Wrapper>
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