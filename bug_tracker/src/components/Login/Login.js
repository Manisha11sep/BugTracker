import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //     //   identifier: '',
    //     //   password: '',
    //     //   errors: {},
    //     //   isLoading: false
    //     };
    // //     this.onSubmit = this.onSubmit.bind(this);
    // // this.onChange = this.onChange.bind(this);
    // }
    render() {
      return(
        <div>
            <div >
    <form>     
      <h2>Please login</h2>
      <input type="text" placeholder="Email Address"  />
      <input type="password" placeholder="Password"/>
      <label>
        <input type="checkbox"  name="rememberMe"/> Remember me
      </label>
      <button type="submit">Login</button>   
    </form>
  </div>

            </div>


      );
            
        
    }
}