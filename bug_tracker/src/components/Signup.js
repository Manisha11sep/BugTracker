import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';

export default class Signup extends Component {
    constructor(){
    super();
    this.state = {
        username:'',
        email:'',
        password:'',
        profile_pic :'',
        messages:'',
        disabled: true, 
        files: []
        }

        this.onChange=this.onChange.bind(this);
    this.createUser = this.createUser.bind( this );
    this.clearForm=this.clearForm.bind(this);

    }   

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    createUser()
    {
     
     const {username,email,profile_pic,password} = this.state;
      axios.post('/api/signup',{username,password,email,profile_pic}).then( response => {
        this.setState({ messages: response.data })
    
      }).catch(console.log("error"))
      this.clearForm();
    }
    clearForm(){
        this.setState({
            username:'',
            email:'',
            password:'',
            profile_pic :'',
            messages:'',
        });
        alert('Thank you for Signing up on Bug Tracker!!')
    }
    onDrop(files) {
        this.setState({
          files
        });
      }

    //   onDrop(){
    //     var file = files[0];
    //       axios.get(ENDPOINT_TO_GET_SIGNED_URL, {
    //     filename: file.name,
    //     filetype: file.type
    //   })
    //   .then(function (result) {
    //     var signedUrl = result.data.signedUrl;
        
    //     var options = {
    //       headers: {
    //         'Content-Type': file.type
    //       }
    //     };
  
    //     return axios.put(signedUrl, file, options);
    //   })
    //   .then(function (result) {
    //     console.log(result);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    // }


render() {
        return (
            <div>
                <form>
                <p className="h4 text-center mb-4">Sign up</p>
                    <div>
                    <label> Username</label>
                    <input type="text" name ="username"
                     placeholder ="Enter Username!!"
                     value ={this.state.username}
                     onChange={this.onChange}/>
            
                    </div>
                        
                    <div>
                    <label >Your password</label>
                        <input type="password" name ="password"  placeholder ="Enter Password!!"
                        value ={this.state.password}
                        onChange={this.onChange}/>
                    
                    </div>

        
                        <div>
                        <label >Email Id </label>
                        <input type="email" name="email"
                        placeholder ="Enter Email!!"
                        value ={this.state.email}
                        onChange={this.onChange}/>
                        </div>

                        <div>
            
                <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
                </div>
                <aside>
                <h5>Dropped files</h5>
                <ul>
                    {
                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                </ul>
                </aside>
                            
                            
                        </div>

            

                <div >
                <button  className="btn btn-primary" onClick ={this.createUser}> Register</button>



                    <input  className="btn btn-primary" type="reset"/>
                    <br />
                    <span> {this.state.messages}</span>
                </div>
    
</form>
                </div>

            
        );
    }
}