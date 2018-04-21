import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';

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
      <section className="Header__parent">
        <section className="Header__content">

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

      

        </section>
      </section>
    )
  }
}