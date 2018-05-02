import React, { Component } from 'react';
import axios from 'axios';
import ProfileStyle from './../style/ProfileStyle.css';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
       users:[]
        }
    }

    componentDidMount(){
            axios.get("/api/admin/users").then(response => {
              this.setState({ users: response.data });
              console.log("Inside admin", this.state.users);
            });
          }

    render() {
        return (
  
          <div >
                  <h1> List of Users </h1>
                <div className="grid-container">
              {this.state.users.map((user, i) => {
                return (
                  <div  key={user.id}>
                  <div className="panel panel-primary">
                  <div className="panel-heading">{user.username} </div>
                    <div className ="pancel-body"><img className="profile-pic" src= {user.profile_pic} /> </div>
                    <div className ="panel-footer">{user.email} </div>
              
                  </div>
                  </div>
                 
              );
            })}
          </div>
          </div>
        );
    }
}

export default Profile;