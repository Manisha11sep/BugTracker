import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import './../style/SignupStyle.css';
import { Link } from 'react-router-dom';

const CLOUDINARY_UPLOAD_URL="https://api.cloudinary.com/v1_1/manisha11/image/upload";
const CLOUDINARY_UPLOAD_PRESET ="hdi8lbnt";
const CLOUDINARY_UPLOAD_PRESET_SIGNED ="Bug_Tracker";


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
        files: [],
        cloudinaryUrl: ''
        }

        this.onChange=this.onChange.bind(this);
    // this.createUser = this.createUser.bind( this );
    this.clearForm=this.clearForm.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    }   

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    // createUser()
    // {
     
    //  const {username,email,profile_pic,password} = this.state;
    //   axios.post('/api/signup',{username,password,email,profile_pic}).then( response => {
    //     this.setState({ messages: response.data })
    
    //   }).catch(console.log("error"))
    //   this.clearForm();
    // }
    clearForm(){
        this.setState({
            username:'',
            email:'',
            password:'',
            profile_pic :'',
            messages:'',
            uploadUrl:''
            
        });
        alert('Thank you for Signing up on Bug Tracker!!')
    }
    onDrop(files) {
        this.setState({
          files
        });
      }

      uploadImage(file){
        console.log("inside uploadfile" , file);
        axios.get('/api/upload').then(response => {
            console.log("response data", response.data)
            //********form data for Signed upload */
            // let formData = new FormData();
            // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET_SIGNED);
            // formData.append("signature", response.data.signature)
            // formData.append("api_key","135962885327916");
            // formData.append('timestamp', response.data.timestamp);
            // formData.append('file', file[0]);
            // console.log("form data is ", formData);

            //form data for unsigned uploads

        let formData = new FormData();
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("file", file[0]);
               
            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
            console.log(response.data)
            this.setState({uploadUrl: response.data.secure_url})
            const user = {
            username: this.state.username,
            email: this.state.email,
            profile_pic: this.state.uploadUrl,
            password: this.state.password,
            }
            console.log(user)
            axios.post('/api/signup', user).then(response => {
                console.log("response from server", response);
                if(response.data === 'registered'){
                    window.location = '/'
                } 
                this.clearForm();
            })
            
            })
        })
    }
    


    render() {
    
        return (
            <div>
                <div className='container'>
                        <h1 className=''>register</h1>
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" className="form-control signup-input" placeholder="username" onChange={e => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control signup-input" placeholder="password" onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>email</label>
                            <input type="text" className="form-control signup-input" placeholder="email" onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>image Upload</label>
                            <input type="file" onChange={e => this.setState({profile_pic: e.target.files})} className="form-control-file fileInput"/>
                        </div>
                        {this.state.failMessage}
                        <button className="btn btn-primary" onClick={() => this.uploadImage(this.state.profile_pic)}>sign up</button>
                </div>
                
            </div>
        );
    }
}