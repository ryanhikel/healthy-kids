import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./ShowDoc.css";
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

class Show extends Component {
	constructor(props) {
		super(props);
		this.state = {
			educations: [],
			hours: ''
		}
	}

	render() {
		console.log(this.props.doctor);
		let street1 = '';
		let street2 = '';
		let zip = '';
		let city = '';
		let state = '';
		let addresses = [];
		let license = this.props.doctor.licenses.filter(x => x.number !== undefined && x.state !== undefined);
		for (let i = 0; i < this.props.doctor.practices.length; i++) {
			street1 = this.props.doctor.practices[i].visit_address.street;
			street2 = this.props.doctor.practices[i].visit_address.street2;
			zip = this.props.doctor.practices[i].visit_address.zip;
			city = this.props.doctor.practices[i].visit_address.city + ", ";
			state = this.props.doctor.practices[i].visit_address.state_long;
			addresses.push(`${street1} ${street2 ? street2: ''} ${city} ${state} ${zip}`)
		}
		return (
			<div className="item ShowDoc">
				<Card bg="light" border="dark" style={{ width: '20rem' }}>
					<Card.Img variant="top" src={this.props.doctor.profile.image_url} />
					<Card.Header as="h3">
						{this.props.doctor.profile.last_name + ', ' + this.props.doctor.profile.first_name + ' ' + this.props.doctor.profile.title}
					</Card.Header>
					<Accordion>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							Bio
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>{this.props.doctor.profile.bio}</Card.Body>
						</Accordion.Collapse>
					</Accordion>
					<Accordion>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							Licences
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="1">
							<Card.Body>
								{
									license.map((license, index) => {
										return <Card.Text key={index}>{license.state} {license.number}</Card.Text>
									})
								}
							</Card.Body>
						</Accordion.Collapse>
					</Accordion>
					<Accordion>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							Addresses
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								{
									addresses.map((addresses, index) => {
										return <Card.Text key={index}>{addresses}</Card.Text>
									})
								}
							</Card.Body>
						</Accordion.Collapse>
					</Accordion>
					<Link to={`/doctor/${this.props.doctor.uid}`}>
						<Button variant="primary" renderAs="button">
							View Doctor
                        </Button>
					</Link>
				</Card>
			</div>
		)
	}
}

export default Show;