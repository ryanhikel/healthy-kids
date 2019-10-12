import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListDoctors from '../ListDoctors/ListDoctors';
import SingleDoctor from '../SingleDoctor/SingleDoctor';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/doctors' exact component={ListDoctors} />
          <Route path={`/doctor/:id`} exact component={SingleDoctor} />
        </div>
      </Router>
    )
  }
}

export default App;
