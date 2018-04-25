import React, { Component } from 'react';

export default class  extends Component {
    render() {
        return (
            <div>
                <form action="/send-email" method="post">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label>Subject</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Subject"/>
                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea placeholder="Enter the message"/>
                </div>
               
                <button type="submit" className="btn btn-success">Submit</button>
                </form>
                </div>
        );
    }
}