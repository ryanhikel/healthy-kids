import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
class Navigation extends React.Component {
  render() {
    return (
      <Navbar fixed="top" className="Navigation" bg="dark" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="doctors">Search</Nav.Link>
          <Nav.Link href="about">About</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;