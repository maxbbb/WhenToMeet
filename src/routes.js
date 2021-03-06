import React, { Component } from 'react';
import { ReactRouter, Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import Home from './components/Home'
import Availability from './components/Availability'
import Start from './components/Start'
import Results from './components/Results'


var routes = (

  <Router history={browserHistory}>
    <Route path='/' component={Home} />
    <Route path='/Start' component={Start} />
    <Route path='/Availability' component={Availability} />
    <Route path='/Results' component={Results} />
  </Router>
);

export default routes
