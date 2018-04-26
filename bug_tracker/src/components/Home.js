import React, { Component } from 'react';
import "./../style/HomeStyle.css";
import { Link } from "react-router-dom";


export default class Home extends Component {
    render() {
        return (
        <div className="section">
        <div className ="container">
            <div class="row">
                 <div class="col-lg-12 home-header text-center">
                    <h1> Welcome {this.props.username} </h1>
                </div>
            </div>
            <div className="row">
                    <div className="col-md-4 text-center"> 
                        <div className ="home-heading">
                            <h1>  <Link to="/dashboard" > Issues 
                                </Link> 
                            </h1>
                                <br />
                            <h4> Click here to get all the Issue details </h4>
                        </div>
                    </div>
    
              
                    <div className="col-md-4 text-center">
                        <div className ="home-heading">
                                <h1><Link to="/issue" > New Issue </Link> </h1> 
                                <br />
                                <h4> Click here to Create a new Issue </h4>
                        </div>
                    </div>


                    
                    <div className="col-md-4 text-center">
                        <div className ="home-heading">
                                <h1><Link to="/search" > Search  </Link></h1> 
                                <br />
                                <h4> Click here to Search a Issue  </h4>
                        </div>
                    </div>


            </div>
        
        </div>
        </div>
        );
    }
}