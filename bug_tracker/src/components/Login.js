import React, { Component } from 'react';
import App from '../App.css';
import axios from 'axios';
// import validateInput from './validations';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user:null,
      username: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.login = this.login.bind( this );
   this.username = this.username.bind(this);
   this.password = this.password.bind(this);
  //  this.onSubmit = this.onSubmit.bind(this);


  }

  username(event){
    this.setState({username:event.target.value});
    console.log(this.state.username);

}
password(event){
    this.setState({password:event.target.value});
    console.log(this.state.password);
}

// isValid() {
//   const { errors, isValid } = validateInput(this.state);

//   if (!isValid) {
//     this.setState({ errors });
//   }

//   return isValid;
// }

// onSubmit(e){
//   e.preventDefault();
//   if(this.isValid()){

//   }
// }


  login() {
    this.setState({ message: null });
    const { username, password } = this.state;
    console.log("inside createpost", {username,password})
    axios.post('/api/login',{username,password}).then(response => {
      this.setState({ user: response.data });
      console.log(response.data);
      window.location = '/dashboard';
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  };

// logout = () => {
//   axios.post('/api/logout').then(response => {
//     this.setState({ user: null });
//   }).catch(error => {
//     this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
//   });
// };



render() {
  const {username, password, isLoading, message} = this.state;
  return (
    <div className="main">
  Please login 
  <div>
        {/* <form onSubmit={this.onSubmit}> */}
        <input type="text" placeholder="Username"  value ={username}
           onChange={this.username}/>
        <input  type="password" placeholder="Password" value ={password}
           onChange={this.password}/>
        <div>
          <button  disabled={isLoading} onClick={ this.login }>Login </button>

          <span> Status is :  {message}</span>
        </div>
        {/* </form> */}
        </div>
    </div>
  );
}
}