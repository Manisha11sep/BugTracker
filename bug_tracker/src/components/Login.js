import React, { Component } from 'react';
import App from '../App.css';
import axios from 'axios';
// import validateInput from './validations';
import { connect } from "react-redux";
import { logout} from '../ducks/reducer'; 
import Signup from './Signup';
import { Link } from "react-router-dom";
// import Header from './Header';
import styled from 'styled-components';
import Logo from './../Logo.jpg';
import './../style/Login.css';


const Wrapper = styled.div`

height:250px;
width:500px;
margin:0 auto;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.45);
  border-radius: 5px;
  border-color:black;
  text-align: center;
  &:hover{
    cursor:pointer;
    box-shadow: 1px 4px 5px rgba(0,0,0,0.45);
  }
  @media (max-width: 739px) {
    width: 100%;
  }
`;
const InnerBox = styled.div`

  margin: 0 auto;
  text-align: center;
  justify-content: space-between;
  padding:20px 20px;
  `;

  const Title = styled.h5`
  font-size: 22px;
  text-align: center;
  color:black;
 margin:20px 20px;
`;
const Title1 = styled.p`
font-size: 18px;
text-align: center;
color:black;
margin-right:20px;
`;
const Button = styled.button`
margin:0px 10px;
cursor: pointer;
border-color: black;
`;



export default class Login extends Component {
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
         
          {response.data.username ==='admin'
          ?
          window.location = '/admin'
          :
          window.location = '/home';
          console.log("other user");
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


render() {
  const {username, password} = this.state;
  return (
    <div className="section login-backgorund">
    <div className="container">
    <InnerBox>
    <img src ={Logo} alt="logo" height="100" width="100"/>
    </InnerBox>
      <InnerBox>
                
    <Title>
        Welcome to Bug Tracker.
         Please Login or Register to access our services!! </Title>
                </InnerBox>
           
                <Wrapper>
                <InnerBox>  <label><Title1>Username</Title1></label> 
                 <input type="text" placeholder="Enter your Username" value ={username}onChange={this.username} required/> 
                 </InnerBox>
                 <InnerBox>
   
           <label><Title1>Password</Title1></label>
             <input  type="password" placeholder="Enter your Password" value ={password } required
             onKeyPress={e=>this.handleKeyPress(e)} onChange={this.password} />
           
     </InnerBox>
          
    
           <InnerBox>
           <div>
           <Button className="btn btn-primary btn-lg"  onClick={ this.login }>Login </Button>

           <Link to="/signup"> <Button className="btn btn-primary btn-lg"> Register </Button></Link>  
            </div>
          
        
            </InnerBox>
                
            </Wrapper>
          


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

// const mapStateToProps = state => {
//   return state;
// };

// const mapDispatchToProps = {
//   userDetail,
// };


// export default connect(mapStateToProps, mapDispatchToProps) (Login);