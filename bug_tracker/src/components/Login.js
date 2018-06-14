import React, { Component } from "react";
import App from "../App.css";
import axios from "axios";
// import validateInput from './validations';
import { connect } from "react-redux";
import { logout } from "../ducks/reducer";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./../Logo.jpg";
import google from "../Images/google.png";
import godaddy from "../Images/godaddy.png";
import groupon from "../Images/groupon.png";
import report from "../Images/report.jpg";
import install from '../Images/install.jpg'
import tools from '../Images/tools.png'
import team from '../Images/team.jpg'
import devmtn from '../Images/devmtn.png'
import lyft from '../Images/lyft.png'
import uber from '../Images/uber.png';
import "./../style/Login.css";


const Heading = styled.div`
  margin: 0%5%;
  color: white;
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

const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  color: white;
  margin: 0 auto;
  line-height: 1;
  max-width: 970px;
margin:0 auto;
  padding:20px 20px;
}
  @media (min-width: 765px) {
    font-size: 30px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 30px;
  }
`;
const Title1 = styled.p`
  text-align: center;
  font-size: 16px;
  color: white;
  margin: 0 auto;
margin:0 auto;
  padding:20px 20px;
}
  @media (min-width: 765px) {
    font-size: 20px;
    padding:20px 20px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 30px;
    padding:20px 20px;
  }
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
            <Title>Bug Tracking for Desktop and Mobile App.</Title>
            <Title1>
              A simple, fast and scalable bug tracking application for agile
              teams, that helps you manage bugs easily and deliver great
              products on time.
            </Title1>
          </LoginHeader>
          <div>
          <button type="button" class="btn btn-primary "> <Link to="/signup">
          
            Get Started for Free   </Link></button>
                
            </div>
          <div className="box">
            <div className="features">
              <h4 className="login-text"> Username </h4>  
              <input
                name="username"
                type="text"
                placeholder="Enter your Username"
                value={username}
                onChange={this.username}
                required
              />
         
            </div>
            <div className="features">
            <h4 className="login-text">Password</h4>
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
             <button type="button" class="btn btn-primary" onClick={this.login}> Login</button>
          </InnerBox>
          </div>

         
        </section>

        <section className="companies">
          <h3 className="center-text"> Top companies love to use Bug Tracker</h3>
          <div className="logo">
            <img className="logo-images" src={google}className="logo-images" />
            <img className="logo-images"src={groupon}  />
            <img className="logo-images"src={uber}  />
          </div>
          <div className="logo">
          <img className="logo-images"src={lyft}  />
            <img className="logo-images" src={godaddy}  />
            <img className="logo-images" src={devmtn}  />
          </div>
        </section>
        <section>
        <h3 className="center-text"> Everything you need for a development workflow</h3>
          <div className="features">
            <div className="benefit">
            <div>
              <img className="features-image" src={install} /> 
              </div>
              <div>
              <h3>SIMPLE INSTALLATION</h3>
              <p className="benefit-text">
              Just add a single line of code and you’re good to go!
              Its easy to use and install.</p>
            </div>
            </div>

            <div className="benefit">
            <div>
              <img className="features-image" src={report} /> 
              </div>
             
              <div >
              <h3>EASY REPORTING</h3>
                <p className="benefit-text">
                  Assign, track, and squash bugs. Manage your team and
                  deliverables with a crystal clear visual report.
                </p>
              </div>
            </div>
          </div>
          <div className="features">
            <div className="benefit">
            <div>
              <img className="features-image" src={team} /> 
              </div>
              <div>
              <h3>EFFICIENT TEAM & CLIENT COMMUNICATION </h3>
              <p className="benefit-text">
                With a click, embrace the death of endless email exchanges and
                feel satisfied with our visual reporting and flexible issue
                tracker features.
              </p>
              </div>
            </div>
            <div className="benefit">
            <div>
              <img className="features-image" src={tools} /> 
              </div>
              <div>
              <h3>UNIVERSAL TOOL </h3>
              <p className="benefit-text">
                No matter the framework ie Laravel, Wordpress, Drupal, etc The
                Bug Squasher works. From here delegate and prioritize website
                change requests effortlessly.
              </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
