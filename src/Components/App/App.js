import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListDoctors from '../ListDoctors/ListDoctors';
import SingleDoctor from '../SingleDoctor/SingleDoctor';
import Navigation from '../Navigation/Navigation'
import LandingPage from '../LandingPage/LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navigation />
          <Route path='/doctors' component={ListDoctors} />
          <Route path='/' exact component={LandingPage} />
          <Route path={`/doctor/:id`} component={SingleDoctor} />
        </div>
      </Router>
    )
  }
}

export default App;
