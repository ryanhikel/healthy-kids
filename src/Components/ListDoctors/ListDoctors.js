import React, { Component } from "react";
import "./ListDoctors.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowDoc from "../ShowDoc/ShowDoc";
import Loading from "../Loading/Loading"

class ListDoctors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			doctors: null
		}
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