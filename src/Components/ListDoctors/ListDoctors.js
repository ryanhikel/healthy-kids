import React, { Component } from "react";
import "./ListDoctors.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowDoc from "../ShowDoc/ShowDoc";
import Loading from "../Loading/Loading"

class ListDoctors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			doctors: null,
			docName: '',
			city: '',
			zipcode: ''
		}
		this.onFormChange = this.onFormChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

	}

	onFormSubmit(evt) {
		evt.preventDefault();
		const searchInfo = {
			docName: this.state.docName,
			city: this.state.city,
			zipcode: this.state.city
		}
		fetch('/search', {
			method: 'POST',
			body: JSON.stringify(searchInfo),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: "same-origin"
		})
			.then(response => response.json())
			.then(response => {
				if (response.doctors != null) {
					return (
						this.props.doctors(response.doctors)
					)
				} else {
					console.log("Invalid search")
				}
			})
	}


	onFormChange(evt) {
		const element = evt.target;
		const name = element.name;
		const value = element.value;
		const newState = {};
		newState[name] = value;
		this.setState(newState);
	}

	componentDidMount() {
		fetch(`https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=pediatrician&location=48.83901408841116%2C%20-67.23559077109007%2C%2027.726761877858124%2C%20%20-123.48559077109007&skip=0&limit=15&user_key=765d4d94d563c485b63d477fa8644e1d`)
			.then(response => response.json())
			.then(doctors => {
				this.setState({
					doctors: doctors.data
				})
			});
	}
	render() {
		if (this.state.doctors != null) {
			return (
				<div className='ListDoctors'>
					<div className='container'>
						<div className="form">
							<form className="Login control" onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
								<input className='input' type="password" name="password" value={this.state.password} />
								<input className='button' type="submit" value="submit" />
							</form>
						</div>
						<br/>
						{this.state.doctors.map((doctor, index) => {
							return (
								<ShowDoc
									key={index}
									doctor={doctor}
								/>
							)
						})}
					</div>
				</div>
			)
		}
		else {
			return (
				<Loading />
			)
		}
	}
}

export default ListDoctors;