import React, { Component } from 'react';
import { Link } from 'react-router';
import Messages from './Messages.js';
import '../styling/Results.css';
import 'hint.css/hint.css'
var firebase = require('firebase');
var axios = require('axios')

const api = axios.create({
  responseType: "json"
});

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timebars: 0,
      meetingName: '',
      meetingId: '',
      signedIn: false,
    }
    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      localStorage.setItem('username', user.displayName)
      return user
    }).then(function(res) {
      this.setState(Object.assign({}, this.state, {signedIn: true}))
    }.bind(this))
  }

  componentWillMount() {
    var meetingID = (!this.props.location.query.meetingId ? localStorage.getItem("meetingId"): this.props.location.query.meetingId )

    this.setState(Object.assign({}, this.state, {meetingId: meetingID}))

    var slots = [
      { time: '7:00am', count: 0, people: [] },
      { time: '8:00am', count: 0, people: [] },
      { time: '9:00am', count: 0, people: [] },
      { time: '10:00am', count: 0, people: [] },
      { time: '11:00am', count: 0, people: [] },
      { time: '12:00pm', count: 0, people: [] },
      { time: '1:00pm', count: 0, people: [] },
      { time: '2:00pm', count: 0, people: [] },
      { time: '3:00pm', count: 0, people: [] },
      { time: '4:00pm', count: 0, people: [] },
      { time: '5:00pm', count: 0, people: [] },
      { time: '6:00pm', count: 0, people: [] },
      { time: '7:00pm', count: 0, people: [] },
      { time: '8:00pm', count: 0, people: [] },
      { time: '9:00pm', count: 0, people: [] },
      { time: '10:00pm', count: 0, people: [] },
      { time: '11:00pm', count: 0, people: [] },
      { time: '12:00am', count: 0, people: [] },]
    var numRsvps = 0
    api.get('http://localhost:6969/meeting/availability/' + meetingID)
      .then(function (response) {
        console.log(response.data)
        console.log(numRsvps)
        this.state.meetingName = response.data.title
        response.data.rsvpList.forEach(function (i) {
          i.timeslots.forEach(function (x) {
            slots.forEach(function (y) {
              if (y.time === x) {
                y.count++
                y.people.push(i.user)
              }
            });
          });
        });
        numRsvps = response.data.rsvpList.length;
        this.setState(Object.assign({}, this.state, {
          timebars: slots.map((slot) => (
            <span className="hint--bottom hint--rounded hint--bounce hint--medium" aria-label={
              slot.people.map((i) => ('\n' + i + "\n"))}>
              <div className="slot">
                <div className="time">
                  <b>{slot.time}</b>, {slot.count} out of {numRsvps} are available.
              </div>
                <div className="bar">
                  <div className="fill" style={{ width: ((slot.count / numRsvps * 100).toString() + '%')}}>
                  </div>
                  <br />
                </div>
              </div>
            </span>
          )
          )
        }))
    }.bind(this))
  }

  render() {
    if (!localStorage.getItem('username') && this.state.signedIn === false) {
      return (
        <div className="background">
          <div className='centered-title' style={{ width: '95%' }}>
            <h1 className='title'> {this.state.meetingName} </h1> <br />
            You're not signed in. Please sign in below <br/> <br/> <button className="title-button" onClick={this.authenticate}>Sign In</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="background">
          <div className="centered-title" style={{ width: '95%' }}>
            <h1 className='title'> {this.state.meetingName} </h1> <br />
          </div>
          <div className="timebars">
            {this.state.timebars}
          </div>
          <Messages user={localStorage.getItem('username')} id={this.state.meetingId} /> <br />
          <br />
          <div className="link">
            <h3>Want to change your availability? Click <a href={'http://localhost:3000/Availability?meetingId=' + localStorage.getItem('meetingId')}>here</a></h3>
            <br/>
            <h3>Want to check the status of this meeting later? Use this link: </h3>
            <h4>http://localhost:3000/Results?meetingId={localStorage.getItem('meetingId')}</h4>
            <br/>
            <h3> Share this link with your friends who need to set their availability: </h3>
            <h4> http://localhost:3000/?meetingId={localStorage.getItem('meetingId')} </h4>
          </div>
        </div>
      )
    }
  }
}

export default Results
