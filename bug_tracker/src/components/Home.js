import React, { Component } from "react";
import "./../style/HomeStyle.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import { userDetail, logout } from "../ducks/reducer";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    axios.get("/api/session").then(response => {
      console.log("inside header user data", response.data);
      this.setState({ user: response.data });
      this.props.userDetail(response.data);
    });
  }
  render() {
    return (
      <div className="home-background">
        <h1 className="heading"> Welcome {this.props.username} </h1>

        <div className="home-container">
          <div className="home-heading">
            <h1>
              <Link to="/dashboard"> Issues</Link>
            </h1>
            <br />

            <h4 className="home-text">
              Click here to get all the Issue details
            </h4>
          </div>

          <div className="home-heading">
            <h1>
              <Link to="/issue"> New Issue </Link>{" "}
            </h1>
            <br />
            <h4 className="home-text"> Click here to Create a new Issue </h4>
          </div>

          <div className="home-heading">
            <h1>
              <Link to="/search"> Search </Link>
            </h1>
            <br />
            <h4 className="home-text"> Click here to Search a Issue </h4>
          </div>
        </div>
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
)(Home);
