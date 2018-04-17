import React, { Component } from 'react';

export default class Signup extends Component {
    render() {
        return (
            <div>
                <form>
    <p className="h4 text-center mb-4">Sign up</p>
                <div className="md-form">
        <i className="fa fa-user prefix grey-text"></i>
        <input type="text"  className="form-control" />
        <label>
            Username
        </label>
    </div>

   
    <div className="md-form">
        <i className="fa fa-envelope prefix grey-text"></i>
        <input type="email" className="form-control" />
        <label >Email ID
        </label>
    </div>

    <div className="md-form">
        <i className="fa fa-exclamation-triangle prefix grey-text"></i>
        <input type="file" className="form-control" />
        <label >Profile Picture
        </label>
    </div>

  
    <div className="md-form">
        <i className="fa fa-lock prefix grey-text"></i>
        <input type="password" className="form-control" />
        <label for="materialFormRegisterPasswordEx">Your password</label>
    </div>

    <div className="text-center mt-4">
        <button className="btn btn-primary" type="submit">Register</button>
    </div>
</form>
                </div>

            
        );
    }
}