var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain)

// Keyed with meeting id => meeting detail object.
var meetingDb = {
  users: [
    {
      name: '',
      id: '',
    }
  ],
  meetings: {
    '123456': {
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
};


app.post("/user", (req, res) => {
  var user = req.body;
  meetingDb.users.push(user)
  return res.send(meetingDb.users);
});

app.post("/meeting/create", (req, res) => {
  var meetingID = req.body.id
  meetingDb.meetings[meetingID] = req.body
  return res.send(meetingDb.meetings);
});

app.post("/meeting/rsvp/:id", (req, res) => {
  meetingDb.meetings[req.params.id].rsvpList.push(req.body)
  return res.send(meetingDb.meetings[req.params.id]);
});

app.get("/meeting/availability/:id", (req, res) => {
  //summarize rsvps in that meeting's rsvpList in whatever form makes sense for the client.
  var ID = req.params.id
  var data = meetingDb.meetings[ID]
  console.log(meetingDb.meetings[ID])
  return res.send(data);
});

app.get("/meeting/messages/:id", (req, res) => {
  var messages = meetingDb.meetings[req.params.id].messageList
  return res.send(messages)
});

app.post("/meeting/messages/:id", (req, res) => {
  meetingDb.meetings[req.params.id].messageList.push(req.body)
  var messages = meetingDb.meetings[req.params.id].messageList
  return res.send(messages)
});



const appPort = 6969;

app.listen(appPort, function () {
  console.log("Meeting finder running on " + appPort);
}).on("error", function (err) {
  console.log(err);
});
