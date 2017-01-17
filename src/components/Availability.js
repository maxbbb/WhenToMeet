import React, { Component } from 'react';
import { ReactRouter, Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { ListGroupItem, Button, ListGroup, Checkbox } from 'react-bootstrap';
import "../styling/Availability.css";
var axios = require('axios')
var firebase = require('firebase')

const api = axios.create({
  responseType: "json"
});


var hours = ['7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am']

class Availability extends Component {

  constructor(props) {
    super(props);
    this.state = { times: [] }
    this.addTime = this.addTime.bind(this)
    this.submitAvailability = this.submitAvailability.bind(this)
  }

  addTime(time) {
    if (this.state.times.indexOf(time) !== -1) {
      this.state.times.splice(this.state.times.indexOf(time), 1)
    } else {
      this.state.times.push(time)
    }
    this.setState({ times: this.state.times })
    console.log(this.state.times)
  }

  submitAvailability() {
    console.log(localStorage.getItem('meetingId'))
    var availability = {
      user: localStorage.getItem('username'),
      timeslots: this.state.times
    }
    api.post("http://localhost:6969/meeting/rsvp/" + localStorage.getItem('meetingId'), availability)
      .then(function (res) {
        this.props.router.push({
          pathname: '/Results'
        });
      }.bind(this));
  }

  render() {
    if (localStorage.getItem('creator') === "true") {
      return (
        <div className="background">
          <div className="availability">
            <h1 className='title'>Fill in your availability!</h1><br />
            <h3>After that, send this link to friends so they can fill it out too:</h3>
            <h5>http://localhost:3000/?meetingId={localStorage.getItem('meetingId')}</h5> <br />
            {hours.map(function (i) {
              return (
                <div>
                  <div className={(this.state.times.indexOf(i) === -1 ? "timeslot" : "timeslot active")} onClick={this.addTime.bind(null, i)}>
                    {i}
                  </div>
                </div>
              )
            }.bind(this))}
            <br />
            <button className='available-button' onClick={this.submitAvailability}> Submit </button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="background">
          <div className="availability">
            <h1 className='title'>Fill in your availability!</h1><br />
            {hours.map(function (i) {
              return (
                <div>
                  <div className={(this.state.times.indexOf(i) === -1 ? "timeslot" : "timeslot active")} onClick={this.addTime.bind(null, i)}>
                    {i}
                  </div>
                </div>
              )
            }.bind(this))}
            <br />
            <button className='available-button' onClick={this.submitAvailability}> Submit </button>
          </div>
        </div>
      )
    }
  }
}
export default Availability

