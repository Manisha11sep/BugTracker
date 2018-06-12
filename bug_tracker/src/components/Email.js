import React, { Component } from "react";
import axios from "axios";
import "./../style/EmailStyle.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: [],
      subject: "",
      body: "",
      username: "",
      email: "",
      profile_pic: ""
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    axios.get("/api/session").then(response => {
      console.log("inside header user data", response.data);
      this.setState({
        username: response.data.username,
        profile_pic: response.data.profile_pic,
        email: response.data.email
      });
      console.log("user deails", this.state.userdetail);
    });
  }

  sendEmail(event) {
    const { to, subject, body, username, email, profile_pic } = this.state;
    console.log(
      "inside email",
      to,
      subject,
      body,
      username,
      email,
      profile_pic
    );
    axios
      .post("/api/send-email", {
        to,
        subject,
        body,
        username,
        email,
        profile_pic
      })
      .then(this.setState({ to: "", subject: "", body: "" }));

    alert("Email Sent successfully.");
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="email-background">
        <div className="email-box">
          <div>
            <label className="email-text">To:</label>
            <input
              type="email"
              name="to"
              value={this.state.to}
              onChange={this.onChange}
              placeholder="Enter email"
            />
          </div>
          <br />
          <div>
            <label className="email-text">Subject: </label>
            <input
              name="subject"
              value={this.state.subject}
              onChange={this.onChange}
              placeholder="Enter Subject"
            />
          </div>
          <div className="email-body">
            <textarea
              name="body"
              placeholder="Enter the message"
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>

          <button className="btn btn-info" onClick={this.sendEmail}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
