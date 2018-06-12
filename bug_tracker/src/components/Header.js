import React, { Component } from "react";
import CompanyIcon from "react-icons/lib/md/filter-hdr";
import ProfileIcon from "react-icons/lib/md/person-outline";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";
import styled from "styled-components";
import { connect } from "react-redux";
import { userDetail, logout } from "../ducks/reducer";
import Logo from "./../Logo.jpg";

const Wrapper = styled.div`
display: flex;
background-color:black;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	align-content: center;
`;
const InnerBox = styled.div`
  color: white;
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
  text-color: black;
`;
const Img = styled.img`
  display: block;
  height: 40px;
  width: 40px;
  border-color: black;
  border-radius: 20%;
  @media (min-width: 765) {
    height: 100px;
    width: 100px;
  }
  @media only screen and (min-width: 1200px) {
    height: 70px;
    width: 70px;
  }
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      navbar: true
    };
  }
  componentDidMount() {
    axios.get("/api/session").then(response => {
      console.log("inside header user data", response.data);
      this.setState({ user: response.data });
      // this.props.userDetail(response.data);
    });
  }
  logout = () => {
    axios.post("/api/logout").then(response => {
      if (response.data === "logged out") {
        window.location.href = "/";
      }
    });
  };
  burgerToggle = () => {
    this.setState({ navbar: false });
  };

  render() {
    return (
      <div>
        {this.state.user.username !== "" ? (
            <Wrapper>
                <InnerBox>
                <Img src={Logo} alt="logo" />
                </InnerBox>
                               
                  <InnerBox>
                    <Link to="/home">Home</Link>
                  </InnerBox>
                               
                  <InnerBox>
                    <Link to="/dashboard">Dashboard</Link>
                  </InnerBox>
                               
                  <InnerBox>
                    <Link to="/issue"> New Issue </Link>
                  </InnerBox>
                               
                  <InnerBox>
                    <Link to="/search">Search</Link>
                  </InnerBox>
                               
                  <InnerBox>
                    <Link to="/" onClick={() => this.logout()}>
                      Log out
                    </Link>
                  </InnerBox>
              </Wrapper>
          
        ) :
        null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  userDetail
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
