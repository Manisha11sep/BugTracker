import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import './../style/SignupStyle.css';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import validateInput from './Validations';

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
        cloudinaryUrl: '',
        errors:{},
        isValid:''
        
        }

        this.onChange=this.onChange.bind(this);
    // this.createUser = this.createUser.bind( this );
    this.clearForm=this.clearForm.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.signUp=this.signUp.bind(this);

    }   

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
        
    }

    clearForm(){
        this.setState({
            username:'',
            email:'',
            password:'',
            profile_pic :'',
            messages:'',
            uploadUrl:'',
          
        });
        alert('Thank you for Signing up on Bug Tracker!!')
    }

   isValid() {
       console.log("inside isvali")
       const {errors,isValid} = validateInput(this.state);
       if(!isValid){
           console.log("inside is validinput", errors)
           this.setState({errors});
       }
       return isValid;
   }

      uploadImage(file){
        console.log("inside uploadfile" , file);
        axios.get('/api/upload').then(response => {
            console.log("response data", response.data)

                    let formData = new FormData();
                    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                    formData.append("file", file[0]);
                        
                        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
                        console.log(response.data)
                        this.setState({uploadUrl: response.data.secure_url})
                    })
                })
            }
            // const user = {
            // username: this.state.username,
            // email: this.state.email,
            // profile_pic: this.state.uploadUrl,
            // password: this.state.password,
            // }
            
            // console.log(user)
            // if(this.isValid()){
            //     console.log("inside isValid function");
            //     this.setState({errors:{}});
               
            
      
        signUp(){ 
            // const {username,email,password,uploadUrl}=this.state
           if (this.isValid())
           {
                axios.post('/api/signup', this.state).then(response => {
                    if(response.data === 'registered'){
                        window.location = '/'
                    } 
                    this.clearForm();
                })
                
       
            }

         }
            
    
    


    render() {
    const {errors} =this.state;
        return (
            <div>
                <div className='container'>
                        <h1 className=''>register</h1>
                        <div className={classnames("form-group", {'has-error':errors.username})}>
                            <label>username</label>
                            <input type="text" className="form-control signup-input" placeholder="username" onChange={e => this.setState({username: e.target.value})}/>
                            {errors.username && <span className="help-block">{errors.username} </span>}
                        </div>
                       
                        <div className={classnames("form-group", {'has-error':errors.password})}>
                            <label>password</label>
                            <input type="password" className="form-control signup-input" placeholder="password" onChange={e => this.setState({password: e.target.value})}/>
                            {errors.password && <span className="help-block">{errors.password} </span>}
                        </div>
                        <div className={classnames("form-group", {'has-error':errors.email})}>
                            <label>email</label>
                            <input type="text" className="form-control signup-input" placeholder="email" onChange={e => this.setState({email: e.target.value})}/>
                            {errors.email && <span className="help-block">{errors.email} </span>}
                        </div>
                        <div className="form-group">
                            <label>image Upload</label>
                            <input type="file" onChange={e => this.setState({profile_pic: e.target.files})} onClick={() => this.uploadImage(this.state.profile_pic)} className="form-control-file fileInput"/>
                        </div>
                        {this.state.failMessage}
                        <button className="btn btn-primary" onClick={()=>this.signUp()} >sign up</button>
                </div>
                
            </div>
        );
    }
}