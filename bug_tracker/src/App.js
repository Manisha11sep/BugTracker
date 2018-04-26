import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import routes from './router';
import { connect } from "react-redux";
// import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';



class App extends Component {
  render() {
    return (
      <div>
        {/* <Router>
          <Route exact path "/" Component = {Login} />
          </Router> */}
          <Header />
           {/* <Navbar /> */}
           {routes}

           <Footer />
      </div>
    );
  }
}

// function mapStateToProps( state ) {
//   return state
// }
export default App;

// export default withRouter(connect( mapStateToProps )( App ));



        // <Switch>
        //   <Route exact path="/" component={Login} />
        // <Route path="/dashboard" component={Dashboard} />
        //  <Route path="/issue"  component={NewIssue} />
        //   <Route path="/signup" component={Signup} />


        // </Switch> 