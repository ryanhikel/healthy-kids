import React, { Component } from "react";
import "./SingleDoctor.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

// conversion from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript

const formatPhoneNumber = (s) => {
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

class SingleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }
    componentDidMount() {
        const doctor_uid = window.location.href.split("/").pop();
        fetch(`https://api.betterdoctor.com/2016-03-01/doctors/${doctor_uid}?user_key=765d4d94d563c485b63d477fa8644e1d`)
            .then(response => response.json())
            .then(doctor => {
                this.setState({
                    doctor: doctor.data,
                });
            });
    }
    render() {
        if (this.state.doctor === undefined) {
            return (
                <div>
                    <Link to={{pathname: "/doctors",}}>
                        <Button variant="primary" renderAs="button">
                            List of All Doctors
                        </Button>
                    </Link>
                </div>
            )
        } else {
            let phones = this.state.doctor.practices[0].phones.filter(x => { return x.type === 'landline' });
            const license = this.state.doctor.licenses.filter(x => x.number !== undefined && x.state !== undefined);
            const street = this.state.doctor.practices[0].visit_address.street;
            const zip = this.state.doctor.practices[0].visit_address.zip;
            const city = this.state.doctor.practices[0].visit_address.city;
            const state = this.state.doctor.practices[0].visit_address.state;
            const address = `${street + ' ' + city + ", " + state + ' ' + zip}`;

            return (
                <div className="control SingleDoctor">
                    <Link to={{ pathname: "/doctors", }}>
                        <Button variant="primary" renderAs="button">
                            Back to All Doctors
                        </Button>
                    </Link>
                    <h1 className="title">
                        {this.state.doctor.profile.last_name + ', ' + this.state.doctor.profile.first_name + ' ' + this.state.doctor.profile.title}
                    </h1>
                    <p>{this.state.doctor.profile.bio}</p>
                    <p>I take these insurances:</p>
                    <div className="breadcrumb is-small">
                        <ul>
                            {this.state.doctor.insurances.map((insurance, index) => {
                                return <li key={index}>{insurance.insurance_plan.name}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2>
                            Licenses:
          </h2>
                        {
                            license.map((license, index) => {
                                return <h4 key={index}>{license.state} {license.number}</h4>
                            })}
                    </div>
                    <p>Address: {address}</p>
                    <h3>Contact me:</h3>
                    <p>{formatPhoneNumber(phones[0].number)}</p>
                </div>
            )
        }
    }
}

export { SingleDoctor as default, formatPhoneNumber };