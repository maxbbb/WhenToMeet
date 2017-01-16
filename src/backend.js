var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Keyed with meeting id => meeting detail object.
let meetingDb = {
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
}
};



app.post("/user", (req, res) => {
  var user = req.body;
  meetingDb.users.push(user)
  //add the rsvp contained in req to a the rsvp array of a particular meeting within meetingDb.
  app.close()
  return res.send(meetingDb);
});



app.get("/meeting/detail/:id", (req, res) => {
  //access passed meeting id via: req.params.id;
  return res.send(meetingDb["test-meeting"]);
});

app.get("/meeting/availability/:id", (req, res) => {
  //summarize rsvps in that meeting's rsvpList in whatever form makes sense for the client.
  return res.send({});
});

app.post("/meeting/rsvp", (req, res) => {
  //add the rsvp contained in req to a the rsvp array of a particular meeting within meetingDb.
  return res.send({});
});

app.post("/meeting/create", (req, res) => {
  //Create a meeting and add it to meetingDb
  return res.send({});
});

app.get("/meeting/list", (req, res) => {
  // Return all meetings in meetingDb.
  return res.send([]);
});

const appPort = 6970;

app.listen(appPort, function () {
  console.log("Meeting finder running on " + appPort);
}).on("error", function (err) {
  console.log(err);
});
