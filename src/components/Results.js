import React, { Component } from 'react';
import { Link } from 'react-router';
import Messages from './Messages.js';
import '../styling/Results.css';
//import Bars from './Bars.js';
var firebase = require('firebase');
var axios = require('axios')

const api = axios.create({
  responseType: "json"
});

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timebars: 0
    }
    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user.displayName, user.uid)
      return user
    })
      .then(function (res) {
        this.props.router.push({
          pathname: '/Results',
          query: {
            username: res.displayName,
            meetingId: this.props.location.query.meetingId
          }
        });
      }.bind(this));
  }

  componentWillMount() {
    var slots = [
      { time: '7:00am', count: 0 },
      { time: '8:00am', count: 0 },
      { time: '9:00am', count: 0 },
      { time: '10:00am', count: 0 },
      { time: '11:00am', count: 0 },
      { time: '12:00pm', count: 0 },
      { time: '1:00pm', count: 0 },
      { time: '2:00pm', count: 0 },
      { time: '3:00pm', count: 0 },
      { time: '4:00pm', count: 0 },
      { time: '5:00pm', count: 0 },
      { time: '6:00pm', count: 0 },
      { time: '7:00pm', count: 0 },
      { time: '8:00pm', count: 0 },
      { time: '9:00pm', count: 0 },
      { time: '10:00pm', count: 0 },
      { time: '11:00pm', count: 0 },
      { time: '12:00am', count: 0 },]
    var numRsvps = 0
    var meetingID = this.props.location.query.meetingId
    api.get('http://localhost:6969/meeting/availability/' + meetingID)
      .then(function (response) {
        console.log(response.data)
        console.log(numRsvps)
        response.data.rsvpList.forEach(function (i) {
          i.timeslots.forEach(function (x) {
            slots.forEach(function (y) {
              if (y.time === x) {
                y.count++
              }
            });
          });
        });
        numRsvps = response.data.rsvpList.length;
        this.setState(Object.assign({}, this.state, {
          timebars: slots.map((slot) => (
            <div className="slot" style={{ margin: '20px', float: 'left' }}>
              <div className="time" style={{  }}>
                <b>{slot.time}</b>, {slot.count} out of {numRsvps} are available.
              </div>
              <div className="bar">
                <div className="fill" style={{width: (slot.count / numRsvps * 400 -4 ) + 'px', backgroundColor: 'green' }}>
                </div>
                <br />
              </div>
            </div>
          )
          )
        }))
      }.bind(this))
  }

  render() {
    if (!this.props.location.query.username) {
      return (
        <div>
          <div style={{ width: '60%', textAlign: 'center', padding: '30px', margin: 'auto' }}>
            <h1> Here's your meetUp! </h1> <br />
            You're not signed in. Please <button onClick={this.authenticate}>Sign In</button>
          </div>
          
        </div>
      )
    } else {
      return (
        <div>
          <div style={{ width: '60%', textAlign: 'center', padding: '30px', margin: 'auto' }}>
            <h1> Here's your meetUp! </h1> <br />
          </div>
          {this.state.timebars}
          <Messages user={this.props.location.query.username} id={this.props.location.query.meetingId} /> <br />
          <br />
          <h3>Want to check the status of this meeting later? Use this link: </h3>
          <h5>http://localhost:3000/#/Results?username={this.props.location.query.username}&meetingId={this.props.location.query.meetingId}</h5>
        </div>
      )
    }
  }
}

export default Results 
