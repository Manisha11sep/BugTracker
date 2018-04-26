import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
    constructor(){
    super();
    this.state = {
        username:'',
        email:'',
        password:'',
        profile_pic :'',
        messages:'',
        }

        this.onChange=this.onChange.bind(this);
    this.createUser = this.createUser.bind( this );
    this.clearForm=this.clearForm.bind(this);
    // this.username= this.username.bind(this);
    // this.password = this.password.bind(this);
    // this.email = this.email.bind(this);
    // this.profile_pic = this.profile_pic.bind(this);

    }   

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
//     username(event){
//         this.setState({username:event.target.value});
//     }
//    email(event){
//         this.setState({email:event.target.value});
//     }
//     password(event){
//         this.setState({password:event.target.value});
//     }
//    profile_pic(event){
//         this.setState({profile_pic:event.target.value});
//     }
    createUser()
    {
     
     const {username,email,profile_pic,password} = this.state;
      axios.post('/api/signup',{username,password,email,profile_pic}).then( response => {
        this.setState({ messages: response.data })
    
      }).catch(console.log("error"))
      this.clearForm();
    }
    clearForm(){
        this.setState({
            username:'',
            email:'',
            password:'',
            profile_pic :'',
            messages:'',
        });
        alert('Thank you for Signing up on Bug Tracker!!')
    }


render() {
        return (
            <div>
                <form>
                <p className="h4 text-center mb-4">Sign up</p>
                    <div>
                    <label> Username</label>
                    <input type="text" name ="username"
                     placeholder ="Enter Username!!"
                     value ={this.state.username}
                     onChange={this.onChange}/>
            
                    </div>

   
                <div>
                <label >Email Id </label>
                <input type="email" name="email"
                  placeholder ="Enter Email!!"
                  value ={this.state.email}
                  onChange={this.onChange}/>
                </div>

                <div>
                <label >Profile Picture </label>
                    <input type="file" name="profile_pic" placeholder ="Upload profile pic!!"
                     value ={this.state.profile_pic}
                     onChange={this.onChange}/>
                    
                    
                </div>

            
                <div>
                <label >Your password</label>
                    <input type="password" name ="password"  placeholder ="Enter Password!!"
                     value ={this.state.password}
                     onChange={this.onChange}/>
                
                </div>

                <div >
                <button onClick ={this.createUser}> Register</button>



                    <input type="reset"/>
                    <br />
                    <span> {this.state.messages}</span>
                </div>
    
</form>
                </div>

            
        );
    }
}