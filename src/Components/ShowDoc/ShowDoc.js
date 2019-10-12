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
		const license = this.props.doctor.licenses.filter(x => x.number !== undefined && x.state !== undefined);
		const street = this.props.doctor.practices[0].visit_address.street;
		const zip = this.props.doctor.practices[0].visit_address.zip;
		const city = this.props.doctor.practices[0].visit_address.city;
		const state = this.props.doctor.practices[0].visit_address.state;
		const address = `${street + ' ' + city + ", " + state + ' ' + zip}`;
		return (
			<div className="ShowDoc">
				<Card bg="light" style={{ width: '20rem' }}>
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
							Address
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>{address}</Card.Body>
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