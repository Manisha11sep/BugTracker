import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "./router";
import { connect } from "react-redux";
import NavbarHeader from './components/NavbarHeader';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./Logo.jpg";

class App extends Component {
  render() {
    console.log(window.location);
    return (
      <div>
        <div>
          {/* {window.location.pathname === "/" ||
          window.location.pathname === "/signup" ? null : (
            <Header />
          )} */}

          <Header />
          {/* <NavbarHeader /> */}
        </div>

        <div>{routes}</div>

        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
