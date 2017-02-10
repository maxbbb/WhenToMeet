import React, {Component} from 'react';
import {
    ReactRouter,
    Router,
    Route,
    Link,
    browserHistory,
    hashHistory
} from 'react-router'
import "../styling/Availability.css";
import 'react-datepicker/dist/react-datepicker.css';
var axios = require('axios')
var firebase = require('firebase')
var DatePicker = require('react-datepicker');
var moment = require('moment');

const api = axios.create({responseType: "json"});

var hours = [
    '7:00am',
    '8:00am',
    '9:00am',
    '10:00am',
    '11:00am',
    '12:00pm',
    '1:00pm',
    '2:00pm',
    '3:00pm',
    '4:00pm',
    '5:00pm',
    '6:00pm',
    '7:00pm',
    '8:00pm',
    '9:00pm',
    '10:00pm',
    '11:00pm',
    '12:00am'
]

class Availability extends Component {

    constructor(props) {
        super(props);
        this.state = {
            times: [],
            startDate: moment(),
            date: 0
        }
        this.addTime = this.addTime.bind(this)
        this.userSubmitAvailability = this.userSubmitAvailability.bind(this)
        this.createrSubmitAvailability = this.createrSubmitAvailability.bind(this)
    }

    addTime(time) {
        if (this.state.times.indexOf(time) !== -1) {
            this.state.times.splice(this.state.times.indexOf(time), 1)
        } else {
            this.state.times.push(time)
        }
        this.setState({times: this.state.times})
    }

    userSubmitAvailability() {

        var availability = {
            user: localStorage.getItem('username'),
            timeslots: this.state.times
        }
        api.post("http://localhost:5000/meeting/rsvp/" + localStorage.getItem('meetingId'), availability).then(function(res) {
            this.props.router.push({pathname: '/Results'});
        }.bind(this));

    }

    createrSubmitAvailability() {

      var availability = {
          hourAvailability: {
            user: localStorage.getItem('username'),
            timeslots: this.state.times
          },
          date: this.state.startDate
      }

      api.post("http://localhost:5000/meeting/createrrsvp/" + localStorage.getItem('meetingId'), availability).then(function(res) {
          this.props.router.push({pathname: '/Results'});
      }.bind(this));
    }

    handleChange(date) {
        this.setState({startDate: date});
    }

    componentWillMount () {

      api.get("http://localhost:5000/meeting/availability/" + localStorage.getItem('meetingId')).then(function(res) {
        this.setState({date: res.data.date})
      }.bind(this))
    }

    render() {
      if (localStorage.getItem('creator') === "true") {
        return (
      <div className = "background" >
          <div className = 'header'>
            <h1 className = 'title' > Fill in your availability ! </h1>
            <br />
            <br />
          </div>
          <div className = "availability" > {
            hours.map(function(i) {
              return (
                <div >
                  <div className = {(this.state.times.indexOf(i) === -1 ? "timeslot" : "timeslot active")}
                    onClick = {this.addTime.bind(null, i)} >
                    {i}
                  </div>
                </div>
              )
            }.bind(this))
          }
            <br/ >
            <br / >
           </div>
          <div className = 'calendar' >
            <DatePicker
              inline
              selected = {this.state.startDate}
              onChange = {this.handleChange.bind(this)}
              />
          </div>
          <div className = 'header' >
            <button className = 'available-button' onClick = {this.createrSubmitAvailability} > Submit </button >
          </div>
        </div >
        );
      } else {
        return (
          <div className = "background" >
              <div className = 'header'>
                <h1 className = 'title' > Fill in your availability ! </h1>
               </div>
              <div className = "availability" > {
                hours.map(function(i) {
                  return (
                    <div >
                      <div className = {(this.state.times.indexOf(i) === -1 ? "timeslot" : "timeslot active")}
                        onClick = {this.addTime.bind(null, i)} >
                        {i}
                      </div>
                    </div>
                  )
                }.bind(this))
              }
                <br/ >
                <br / >
               </div>
              <div className = 'calendar' >
                <DatePicker
                  inline
                  openToDate={moment(this.state.date)}
                  selected={moment(this.state.date)}
                  />
              </div>
              <div className='header' >
                <button className='available-button' onClick={this.userSubmitAvailability} > Submit </button >
              </div>
            </div >
      );
    }
  }
}
export default Availability
