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
  display: flex;
  background-color: lightblack;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  margin: 0%5%;
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
    text-transform:uppercase;
    font-family: 'Ubuntu', sans-serif;
    cursor:pointer;
    color: white;
    padding:10px 10px;
    @media (min-width: 765){
      font-size: 25px;
      padding:15px 15px;
   
    }
  }
  `;
const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 200%;
  margin: 0 auto;
  @media (min-width: 765px) {
    font-size: 30px;
  }
  @media only screen and (min-width: 1200px){
    font-size: 30px;
  }
`;
const Title1 = styled.h2`
  color: #fff;
  padding: 5%;
  margin: 0 auto;
`;
const LoginHeader = styled.div`
  color: #fff;
  text-align: center;
  font-size: 200%;
  text-align: center;
  margin: 5% 5%;
  @media (min-width: 1100px) {
    font-size: 30px;
  }
  @media only screen and (min-width: 1200px){
    font-size: 30px;
  }
`;
const Img = styled.img`
  display: block;
  height: 70px;
  width: 70px;
  border-color: black;
  border-radius: 20%;
  margin: 5px 5px;
  @media (min-width: 765) {
    height: 100px;
    width: 100px;
  }
  @media only screen and (min-width: 1200px){
    height: 100px;
    width: 100px;
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
      <div className="login-backgorund">
        <Heading>
          <Img src={Logo} alt="logo" />
          <Title> Welcome to Bug Tracker.</Title>
        </Heading>

        <LoginHeader>
          Please Login or Register to access our services!!
        </LoginHeader>
        <div className="box">
          <div>
            <Title1> Username </Title1>

            <input
            name='username'
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
          <Button class="btn btn-info" onClick={this.login}>Login </Button>
        </InnerBox>
        <InnerBox>
          <Link to="/signup">
            {" "}
            <Button class="btn btn-info">Register </Button>
          </Link>
        </InnerBox>
      </div>
    );
  }
}
