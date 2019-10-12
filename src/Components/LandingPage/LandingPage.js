import React, { Component } from 'react';
import './LandingPage.css';
import ListDoctors from '../ListDoctors/ListDoctors';

class LandingPage extends Component {
  render() {
    return (
      <div className='LandingPage'>
        <h1 className="title">{'(>^_^)> <(^_^)> <(^_^<)'}</h1>
        <p className="title">Healthy Kids</p>
        <div>
          <ListDoctors/>
        </div>
      </div>
    )
  }
}

export default LandingPage;
