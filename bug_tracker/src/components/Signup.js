import React, { Component } from 'react';

export default class Signup extends Component {
    render() {
        return (
            <div>
                <form>
                <p className="h4 text-center mb-4">Sign up</p>
                    <div>
                    <label> Username</label>
                    <input type="text" name ="username"/>
            
                    </div>

   
                <div>
                <label >Email Id </label>
                <input type="email" name="email"/>
                </div>

                <div>
                <label >Profile Picture </label>
                    <input type="file" />
                    
                    
                </div>

            
                <div>
                <label >Your password</label>
                    <input type="password" name ="password"/>
                
                </div>

                <div >
                    <button className="btn btn-primary" type="submit">Register</button>

                    <input type="reset"/>
                </div>
    
</form>
                </div>

            
        );
    }
}