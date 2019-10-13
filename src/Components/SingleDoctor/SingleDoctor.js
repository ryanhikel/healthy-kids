import React, { Component } from "react";
import "./SingleDoctor.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ShowDoc from "../ShowDoc/ShowDoc"

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
                    <Link to={{ pathname: "/doctors", }}>
                        <Button variant="primary" renderAs="button">
                            Back to Search
                        </Button>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="SingleDoctor">
                    <div className="container">
                        <ShowDoc
                            doctor={this.state.doctor}
                        />
                    </div>
                </div>
            )
        }
    }
}

export { SingleDoctor as default, formatPhoneNumber };