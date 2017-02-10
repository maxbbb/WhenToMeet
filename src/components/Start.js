import React, { Component } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'
import '../styling/Start.css'
const crypto = require('crypto');
var axios = require('axios')

const api = axios.create({
  responseType: "json"
});


class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { fieldValue: '' };
    this.createMeeting = this.createMeeting.bind(this);
    this.rsvp = this.rsvp.bind(this);
    this.logName = this.logName.bind(this)
  };

  logName(e) {
    this.setState({ fieldValue: e.target.value })
    console.log(this.state.fieldValue)
  };

  createMeeting(e) {
    e.preventDefault()
    var meetingId = crypto.randomBytes(20).toString('hex')
    localStorage.setItem('meetingId', meetingId)
    localStorage.setItem('creator', 'true')

    var meetingDetails = {
      title: this.state.fieldValue,
      creator: localStorage.getItem('username'),
      id: meetingId,
      rsvpList: [],
      messageList: []
    }
    api.post("http://localhost:5000/meeting/create", meetingDetails)
    this.props.router.push({
      pathname: '/Availability',
    });
  }

  rsvp(e) {
    e.preventDefault()
    localStorage.setItem('creator', 'false')
    this.props.router.push({
      pathname: '/Availability'
    });
  }

  render() {
    return (
      <div className="background">
        <div style={{ width: '100%', textAlign: 'center', padding: '30px' }}>
          <h1 className='title'> Let's start planning.</h1> <br />
          <div style={{ padding: '50px' }}>
            <h3> Create Meeting </h3>
            <form onSubmit={this.createMeeting} className="create-meeting">
              <input className='input' type="text" onChange={this.logName} name="meeting" placeholder="Type in name of meetUp" required="required" autoComplete="off" spellCheck="false" />
              <input type="submit" value="submit" className="submit start-button"></input>
            </form>
            <br />
            <h3> RSVP to Meeting </h3>
            <form onSubmit={this.rsvp} className="rsvp">
              <input className="input" type="text" value={(localStorage.getItem('meetingId'))} onChange={this.logName} name="meeting" placeholder="Enter meeting ID" required="required" autoComplete="off" spellCheck="false" />
              <input type="submit" value="submit" className="submit start-button"></input>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Start
