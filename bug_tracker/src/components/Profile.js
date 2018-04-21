import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            image: '',
            recents: []
        }
    }

    componentDidMount(){
        axios.get('/api/checkSession').then((data) => {
            console.log(data.data.profile_pic)
            this.setState({
                username: data.data.username,
                image: data.data.profile_pic,
            })
        })
    }

    render() {
        return (
            <div >
                <div className='personalInfo'>
                    <img className='thumbnail profileImage' src={this.state.image} alt={`of ${this.state.username}`} height="100" width="100"/>
                    <h2>Welcome {this.state.username}!</h2>
                </div>
            </div>
        );
    }
}

export default Profile;