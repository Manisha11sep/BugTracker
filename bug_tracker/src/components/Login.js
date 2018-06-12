import React, { Component } from "react";
import App from "../App.css";
import axios from "axios";
// import validateInput from './validations';
import { connect } from "react-redux";
import { logout } from "../ducks/reducer";
import Signup from "./Signup";
import { Link } from "react-router-dom";
// import Header from './Header';
import styled from "styled-components";
import Logo from "./../Logo.jpg";
import google from '../Images/google.jpg';
import paypal from '../Images/paypal.png';
import yahoo from '../Images/Yahoo_Logo.png'

import "./../style/Login.css";

const LoginBox = styled.div`
  // box-sizing:border-box;
  margin: 10% auto;
  max-width: 500px;
  padding-top: 15px;
  padding-bottom: 10%;
  //   text-align:center;
  border: 0.5px solid #fff;
  // border-radius:10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.45);
  border-radius: 5%;
  border-color: black;
  text-align: center;
  &:hover {
    cursor: pointer;
    box-shadow: 1px 10px 10px 5px rgba(0, 0, 0, 0.45);
  }
`;
const Heading = styled.div`
  margin: 0%5%;
  color:white;
  @media (max-width: 1400px) {
    h3 {
      font-size: 20px;
    }
  }
`;
const InnerBox = styled.div`
  margin: 0 auto;
  text-align: center;
  justify-content: space-between;
  padding: 20px 20px;
`;

const Button = styled.button`
  ;
    background-color: #008CBA
    border:2px solid #f2f2f2;
    border-radius:20px;
    color: slategrey;
    font-family: 'Ubuntu', sans-serif;
    cursor:pointer;
    color: white;
    padding:10px 10px;
    display:inline;
    margin:10px 10px;

   
    @media (min-width: 765){
      font-size: 25px;
      padding:15px 15px;
     
   
    }
    @media (min-width: 1400){
      font-size: 25px;
      padding:25px  25px;

    }
  }
  `;
const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: white;
  font-size: 150%;
  margin: 0 auto;
  line-height: 1;
  max-width: 970px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
}
  @media (min-width: 765px) {
    font-size: 30px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 30px;
  }
`;
const Title1 = styled.h3`
  // color: #fff;
  padding: 3%;
  margin: 0 auto;
`;
const LoginHeader = styled.div`
  color: #fff;
  text-align: center;
  font-size: 200%;
  text-align: center;
  margin: 2% 5%;
  @media (min-width: 1100px) {
    font-size: 30px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 30px;
  }
`;


export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      username: "",
      password: "",
      errors: {},
      isLoading: false
    };
    this.login = this.login.bind(this);
    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    // this.userDetails = this.userDetails.bind(this);
  }

  username(event) {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  }
  password(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }

  login() {
    this.setState({ message: null });
    const { username, password } = this.state;
    axios
      .post("/api/login", { username, password })
      .then(response => {
        console.log("inside login page", response.data);
        this.setState({ user: response.data });

        {
          response.data.username === "admin"
            ? (window.location = "/admin")
            : (window.location = "/home");
          console.log("other user");
        }
      })
      .catch(error => {
        this.setState({ message: "Something went wrong: " });
      });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.login();
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
      <section className="landing">
    
    <LoginHeader>
         <Title>  
        Bug Reporting for Desktop and Mobile App.
        </Title> 
        <Title1> 
        A simple, fast and scalable bug tracking application for agile teams, that helps you manage bugs easily and deliver great products on time.
        </Title1>
       
        </LoginHeader>
    
        <LoginHeader>
          Please Login or Register to access our services!!
        </LoginHeader>
        <div className="box">
          <div>
            <Title1> Username </Title1>
            <input
              name="username"
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={this.username}
              required
            />
          </div>
          <Title1>Password</Title1>
          <br />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            required
            onKeyPress={e => this.handleKeyPress(e)}
            onChange={this.password}
          />
        </div>

        <InnerBox>
          <Button class="btn btn-info" onClick={this.login}>
            Login{" "}
          </Button>
          <Link to="/signup">
            {" "}
            <Button class="btn btn-info">Register </Button>
          </Link>
        </InnerBox>
        </section>
    
      
        <section className="companies">
          <Title1> Top companies love to use Bug Tracker
            </Title1>
            <div className="logo">
            <img src={google} height="50px" width="50px"/>
            <img src={paypal} height="50px" width="50px"/>
            <img src={yahoo} height="50px" width="50px"/>
            </div>
            <div className="logo">
            <img src={google} height="50px" width="50px"/>
            <img src={paypal} height="50px" width="50px"/>
            <img src={yahoo} height="50px" width="50px"/>
            </div>
          </section>
          <section className="features">
          <Title1> Everything you need for a development workflow
            </Title1>
            <div className="benefit">
            <Title1>SIMPLE INSTALLATION</Title1>
            <p>Just add a single line of code and you’re good to go!.</p>
            </div>
            <div className="benefit">
            <Title1>Easy Reporting </Title1>
            <p>Assign, track, and squash bugs. Manage your team and deliverables with a crystal clear visual report.</p>
            </div>
            <div className="benefit">
            <Title1>EFFICIENT TEAM & CLIENT COMMUNICATION </Title1>
            <p>With a click, embrace the death of endless email exchanges and feel satisfied with our visual reporting and flexible issue tracker features.</p>
            </div>
            <div className="benefit">
            <Title1>UNIVERSAL TOOL </Title1>
            <p>No matter the framework ie Laravel, Wordpress, Drupal, etc The Bug Squasher works. From here delegate and prioritize website change requests effortlessly.</p>
            </div>
        
          </section>


      </div>
    );
  }
}
