import React, { Component } from "react";
import "./ListDoctors.css";
import ShowDoc from "../ShowDoc/ShowDoc";

class ListDoctors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			doctors: null,
			searchValue: '',
			searchType: 'lastName'
		}
		this.onFormChange = this.onFormChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

	}

	onFormSubmit(evt) {
		evt.preventDefault();
		let firstName = null;
		let lastName = null;

		switch (this.state.searchType) {
			case "firstName":
				firstName = this.state.searchValue;

				console.log("first " + this.state.searchValue);
				break;
			case "lastName":
				console.log("first " + this.state.searchValue);

				lastName = this.state.searchValue;
				break;
			default:
				console.log("Error please contact administrator")
				break;
		}
		fetch(`https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&skip=0&limit=20&user_key=765d4d94d563c485b63d477fa8644e1d`)
			.then(response => response.json())
			.then(doctors => {
				this.setState({
					doctors: doctors.data
				})
			});
	}

	onFormChange(evt) {
		const element = evt.target;
		const name = element.name;
		const value = element.value;
		const newState = {};
		newState[name] = value;
		this.setState(newState);
	}
	render() {
		if (this.state.doctors != null) {
			return (
				<div className='ListDoctors'>
					<div className='container'>
						<div className="form">
							<form className="Login control" onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
								<select name="searchType">
									<option selected value="firstName">First Name</option>
									<option selected value="lastName">Last Name</option>
								</select>
								<input className='input' placeholder="Search" type="text" name="searchValue" />
								<input className='button' type="submit" value="submit" />
							</form>
						</div>
						<br />
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
				<div className='ListDoctors'>
					<div className='container'>
						<div className="form">
							<form className="Login control" onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
								<select name="searchType">
									<option value="firstName">First Name</option>
									<option value="lastName">Last Name</option>
								</select>
								<input className='input' placeholder="Search" type="text" name="searchValue" />
								<input className='button' type="submit" value="submit" />
							</form>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default ListDoctors;