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
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

const Wrapper = styled.div`
  display: flex;
  background-color: black;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  font-size: 2em;
`;

const HomePage = styled.div`
  display: flex;
  background-color: black;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
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
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  text-color: black;
`;
const Img = styled.img`
  display: block;
  height: 80px;
  float: left;
  width: 80px;
  border-color: black;
  border-radius: 20%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoImage = styled.div`
  color: white;
  text-decoration: none;
  font-size: 25px;
  -webkit-transition: margin-left 0.3s ease-in-out;
  -o-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
  min-height: 50px;
  margin: 0 10px;
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
        {this.state.user.length == 0 ? (
          <Navbar style={{ marginBottom: "0" }} inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Img src={Logo} alt="logo" />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem>
                  <button type="button" class="btn btn-primary">
                    <Link to="/signup">Sign up </Link>
                  </button>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : this.state.user.username !== "admin" ? (
          <Navbar style={{ marginBottom: "0" }} inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Img src={Logo} alt="logo" />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1}>
                  <InnerBox>
                    <Link to="/home">Home</Link>
                  </InnerBox>
                </NavItem>
                <NavItem eventKey={2}>
                  <InnerBox>
                    <Link to="/issue"> New Issue </Link>
                  </InnerBox>
                </NavItem>
                <NavItem eventKey={3}>
                  <InnerBox>
                    <Link to="/search"> Search </Link>
                  </InnerBox>
                </NavItem>
                <NavItem eventKey={1}>
                  <InnerBox>
                    <Link to="/" onClick={() => this.logout()}>
                      Log out
                    </Link>
                  </InnerBox>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : null}
      </div>

      // <div>

      //   {this.state.user.length ==0 ? (
      //         <HomePage>
      //         <LogoImage>
      //         <Img src={Logo} alt="logo" />
      //         </LogoImage>

      //           <LogoImage>
      //           <button type="button" class="btn btn-primary"><Link to="/signup">
      //   Sign up  </Link>
      //   </button>

      //       </LogoImage>
      //       </HomePage>

      //   ) :
      //   (this.state.user.username !=='admin')? (
      //   <Wrapper>
      //           <InnerBox>
      //           <Img src={Logo} alt="logo" />
      //           </InnerBox>

      //             <InnerBox>
      //               <Link to="/home">Home</Link>
      //             </InnerBox>

      //             <InnerBox>
      //               <Link to="/dashboard">Dashboard</Link>
      //             </InnerBox>

      //             <InnerBox>
      //               <Link to="/issue"> New Issue </Link>
      //             </InnerBox>

      //             <InnerBox>
      //               <Link to="/search">Search</Link>
      //             </InnerBox>

      //             <InnerBox>
      //               <Link to="/" onClick={() => this.logout()}>
      //                 Log out
      //               </Link>
      //             </InnerBox>
      //     </Wrapper>
      //   )
      //   :
      //   null
      //   }

      // </div>
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
