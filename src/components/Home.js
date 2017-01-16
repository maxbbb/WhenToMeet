import React, { Component } from 'react';
import '../styling/Home.css';
import { Link } from 'react-router';
var axios = require('axios');
var firebase = require('firebase');
// import {backendInit} from '../backend.js';
//const auth = firebase.auth()

// backendInit()

var config = {
  apiKey: "AIzaSyCkYB_iq851Z8q2vy16PriXXVNAhDob5Ys",
  authDomain: "meetup-3fb4e.firebaseapp.com",
  databaseURL: "https://meetup-3fb4e.firebaseio.com",
  storageBucket: "meetup-3fb4e.appspot.com",
  messagingSenderId: "186195089675"
};
firebase.initializeApp(config);

// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }, function(error) {
//   // An error happened.
// });

class Home extends Component {
  constructor(props) {
    super(props)
    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {

    // auth.signInWithEmailAndPassword(email, pass);
    // auth.createUserWithEmailAndPassword(email, pass);
    // auth.onAuthStateChanged(firebaseUser => {});

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user.displayName, user.uid)
      return user
      // .catch(e => console.log(e.message))
    })
      .then(function (res) {
        const api = axios.create({
          responseType: "json"
        });
        api.post('http://localhost:6969/user', { name: res.displayName, id: res.uid });
        this.props.router.push({
          pathname: '/Start',
          query: {
            username: res.displayName,
            meetingId: this.props.location.query.meetingId
          }
        });
      }.bind(this));
  }

  render() {
    return (
      <div style={{width: '100%', textAlign: 'center', padding: '30px'}}>
        <h1> Welcome to MeetUp!</h1> <br />
        <button onClick={this.authenticate}>Sign In</button>
      </div>
    );
  }
}

export default Home;
