import React, { Component } from 'react';
import { Link } from 'react-router';

var meetingDb = {
  users: [
    {
      name: '',
      id: '',
    }
  ],
  meetings: [
    {
      meetingID: {
        title: "Test meeting",
        creator: "brent@brentbaum.com",
        id: "test-meeting",
        rsvpList: [
          {
            user: "JGRohrlich",
            timeslots: ["1:00am", "10:00am", "8:00am", "9:00am", "5:00pm", "4:00pm"]
          },
          {
            user: "XXXXXXXX",
            timeslots: ["11:00pm", "10:00am", "1:00am", "9:00am", "5:00pm", "4:00pm"]
          },
          {
            user: "YYYYYYY",
            timeslots: ["2:00pm", "10:00am", "8:00am", "9:00am", "5:00pm", "4:00pm"]
          },
          {
            user: "ZZZZZZZZZ",
            timeslots: ["1:00pm", "10:00am", "8:00am", "9:00pm", "5:00pm", "4:00am"]
          },

        ],
        messageList: [
          {
            username: "USER",
            message: "lorem ipsum lorem ipsum lorem ipsum"
          }
        ]
      }
    },
  ]
};


class Results extends Component {
  
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
      { time: '12:00am', count: 0 },
      { time: '1:00am', count: 0 },
      { time: '2:00am', count: 0 },
      { time: '3:00am', count: 0 },
      { time: '4:00am', count: 0 },
      { time: '5:00am', count: 0 },
      { time: '6:00am', count: 0 },]

    
    var meetingID = this.props.location.query.meetingId
    var data = meetingDb.meetings
    data[0].meetingID.rsvpList.forEach(function (i) {
      i.timeslots.forEach(function (x) {
        slots.forEach(function (y) {
          if (y.time === x) {
            y.count++
          }
        })
      })
    })
  }

  render() {
    return (
      <div>
        <h1> Great, here's when you should meet. Feel free to chat.</h1> <br />
        <h5> yayyy</h5>
      </div>)
  }
}

export default Results 
