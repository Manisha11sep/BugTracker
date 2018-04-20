import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Comment from './Comment';
// import Dashboard from 

class Navbar extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="navbar-container">
                    {/* <div className="logo-container">
                        <Link to="/"><img className="logo-image" src={Logo} alt="" /></Link>
                    </div> */}

                    <div className="navbar-links-container">
                        <ul className="navbar-links">
                            <li><Link to="/">Login</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/signup">Register</Link></li>
                            <li><Link to="/issue" > Create New Issue </Link> </li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

export default Navbar;