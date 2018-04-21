import React, { Component } from 'react';
import App from '../App.css';
import axios from 'axios';
// import validateInput from './validations';
import { connect } from "react-redux";
import {userDetail, logout} from '../ducks/reducer'; 
import Signup from './Signup';
// import Header from './Header';

class Login extends Component {
    constructor() {
      super();

      this.state = {
        user:{},
        username: '',
        password: '',
        errors: {},
        isLoading: false
      };
      this.login = this.login.bind( this );
      this.username = this.username.bind(this);
      this.password = this.password.bind(this);
      // this.userDetails = this.userDetails.bind(this);
    }

    username(event){
      this.setState({username:event.target.value});
      console.log(this.state.username);
    }
    password(event){
      this.setState({password:event.target.value});
      console.log(this.state.password);
    }

    login() {
      this.setState({ message: null });
      const { username, password } = this.state;
      axios.post('/api/login',{username,password}).then(response => {
        console.log("inside login page",response.data)
          this.setState({ user: response.data });
          this.props.userDetail(response.data);
          {response.data.username ==='admin'
          ?
          window.location = '/admin'
          :
          window.location = '/dashboard'
        }
      }).catch(error => {
      this.setState({ message: 'Something went wrong: '});
      });
    };

    handleKeyPress(event){
      if(event.key ==='Enter'){
        this.login();
      }
    }

// logout = () => {
//   axios.post('/api/logout').then(response => {
//     this.setState({ user: null });
//   }).catch(error => {
//     this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
//   });
// };



render() {
  const {username, password} = this.state;
  return (
    <div className="main">
  
      Please login 
      <div>
      
        <input type="text" 
          placeholder="Username"
          value ={username}
          onChange={this.username}/>
       
        <input  type="password"
         placeholder="Password"
         value ={password}
         onKeyPress={e=>this.handleKeyPress(e)}
        onChange={this.password}/>
        <div>
            <button  onClick={ this.login }>Login </button>
            {console.log("inside Login page", this.state.user)}
         <p> email id is {this.state.user.email} </p>
         
        </div>
        
      </div>
    </div>
  );
}
}
// function mapStateToProps( state ) {
//   const{id,username,email,profile_pic} = state;
//   return {
//     id,username,email,profile_pic
//   };
// }

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  userDetail,
};


export default connect(mapStateToProps, mapDispatchToProps) (Login);