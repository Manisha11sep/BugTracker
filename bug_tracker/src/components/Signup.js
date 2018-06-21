import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./../style/SignupStyle.css";
import { Link } from "react-router-dom";
import classnames from "classnames";
import validateInput from "./Validations";
import Logo from "./../Logo.jpg";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/manisha11/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "hdi8lbnt";
const CLOUDINARY_UPLOAD_PRESET_SIGNED = "Bug_Tracker";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      profile_pic: "",
      messages: "",
      disabled: true,
      files: [],
      cloudinaryUrl: "",
      errors: {},
      isValid: ""
    };

    this.onChange = this.onChange.bind(this);
    // this.createUser = this.createUser.bind( this );
    this.clearForm = this.clearForm.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearForm() {
    this.setState({
      username: "",
      email: "",
      password: "",
      profile_pic: "",
      uploadUrl: ""
    });
    alert("Thank you for Signing up on Bug Tracker!!");
  }

  isValid() {
    console.log("inside isvali");
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      console.log("inside is validinput", errors);
      this.setState({ errors });
    }
    return isValid;
  }

  uploadImage(file) {
    console.log("inside uploadfile", file);
    axios.get("/api/upload").then(response => {
      console.log("response data", response.data);

      let formData = new FormData();
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("file", file[0]);

      axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
        this.setState({ uploadUrl: response.data.secure_url });
        console.log("Image url is ", this.state.uploadUrl);
      });
    });
  }

  signUp() {
    // const {username,email,password,uploadUrl}=this.state
    if (this.isValid()) {
      const user = {
        username: this.state.username,
        email: this.state.email,
        profile_pic: this.state.uploadUrl,
        password: this.state.password
      };
      console.log("inside signup form", user);
      axios.post("/api/signup", user).then(response => {
        console.log("response is ", response)
        if (response.data === "registered successfully") {
          window.location = "/home";
        }
      });

      this.clearForm();
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="loginContainer">
        <div className="wrapper">
        <div className = "signup-form">
          <div className="form-header">
            <img className="logo-image" src={Logo} />
          </div>
          <div className ="form-body">
          <p className="title">
            Get Started Absolutely 
            <span className="span-text">Free</span>
          </p>

          <div
            className= {classnames("form-group", {
              "has-error": errors.username
            })}
          >
            <input
              type="text"
              className="form-control signup-input"
              placeholder="username"
              onChange={e => this.setState({ username: e.target.value })}
            />
            {errors.username && (
              <span className="help-block">{errors.username} </span>
            )}
          </div>

          <div
            className={classnames("form-group", {
              "has-error": errors.password
            })}
          >
            <input
              type="password"
              className="form-control signup-input"
              placeholder="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            {errors.password && (
              <span className="help-block">{errors.password} </span>
            )}
          </div>
          <div
            className={classnames("form-group", { "has-error": errors.email })}
          >
          
            <input
              type="text"
              className="form-control signup-input"
              placeholder="email"
              onChange={e => this.setState({ email: e.target.value })}
            />
            {errors.email && (
              <span className="help-block">{errors.email} </span>
            )}
          </div>
          <div className="image-upload">
          <div>
            <input
              type="file"
              onChange={e => this.setState({ profile_pic: e.target.files })}
            />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => this.uploadImage(this.state.profile_pic)}
            >
              Upload
            </button>
          </div>
          {this.state.failMessage}
          <button className="
signup-button btn-primary" onClick={() => this.signUp()}>
            sign up
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
