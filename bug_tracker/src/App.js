import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import routes from './router';
// import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Router>
          <Route exact path "/" Component = {Login} />
          </Router> */}

           {routes}
      </div>
    );
  }
}

export default App;
