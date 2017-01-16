import React, { Component } from 'react';
import { ReactRouter, Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { ListGroupItem, Button, ListGroup, Checkbox } from 'react-bootstrap'

var hours = ['7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am']

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
    var availability = {
      user: this.props.location.query.username,
      timeslots: this.state.times
    }
    console.log("RSVP Times: ", availability)
    this.props.router.push({
      pathname: '/Results',
      query: {
        meetingId: this.props.location.query.meetingId
      }
    });
  }

  render() {
    return (
      <div>
        <ul className='list-group'>
          {hours.map(function (i) {
            return (
              <li>
                <input type="checkbox" onClick={this.addTime.bind(null, i)}></input>
                {i}
                <hr />
              </li>
            )
          }.bind(this))}
        </ul>
        <button onClick={this.submitAvailability}> Submit </button>
      </div>
    );
  }
}
export default Availability

