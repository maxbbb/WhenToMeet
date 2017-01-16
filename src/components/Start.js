import React, { Component } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'
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
    var meetingId = Math.floor(Math.random() * 1000000)
    //crypto.randomBytes(10).toString('hex');
    var meetingDetails = {
        title: this.state.fieldValue,
        creator: this.props.location.query.username,
        id: meetingId,
        rsvpList: [],
        messageList: []
      }
    api.post("http://localhost:6969/meeting/create", meetingDetails)
    this.props.router.push({
      pathname: '/Availability',
      query: {
        username: this.props.location.query.username,
        meetingId: meetingId,
        creator: true
      }
    });
  }

  rsvp(e) {
    e.preventDefault()
    console.log("RSVP Registered: " + this.state.fieldValue)
    this.props.router.push({
      pathname: '/Availability',
      query: {
        username: this.props.location.query.username,
        meetingId: this.state.fieldValue
      }
    });
  }

  render() {
    return (
      <div style={{width: '100%', textAlign: 'center', padding: '30px'}}>
        <h1> Let's start planning.</h1> <br />
        <h3> Create Meeting </h3>
        <form onSubmit={this.createMeeting} className="create-meeting">
          <input type="text" onChange={this.logName} name="meeting" placeholder="Type in name of meetUp" required="required" autoComplete="off" spellCheck="false" />
          <input type="submit" className="submit"></input>
        </form>
        <br />
        <h3> RSVP to Meeting </h3>
        <form onSubmit={this.rsvp} className="rsvp">
          <input type="text" value={this.props.location.query.meetingId} onChange={this.logName} name="meeting" placeholder="Enter meeting ID" required="required" autoComplete="off" spellCheck="false" />
          <input type="submit" className="submit"></input>
        </form>
      </div>
    )
  }
}

export default Start
