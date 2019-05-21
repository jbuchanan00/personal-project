import React, { Component } from "react"
import { connect } from "react-redux"
import { updateUserInfo } from "../../redux/userInfoReducer"
import { updatePersonal } from "../../redux/loanAppReducer"
import axios from "axios";

class AFLPersonalInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            ssn: "",
            phone_number: this.props.phone_number,
            city: this.props.city,
            _state: this.props._state,
            zip: this.props.zip,
            account_number: this.props.account_number
        }
    }
    async componentDidMount() {
        let session = await axios.get("/usersession")
        this.props.updateUserInfo(session.data)
    }


    handleSubmit = () => {
        this.props.updatePersonal(this.state)
        this.props.history.push("/apply/2")
    }
    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {

        let applyForLoan = (!this.state.first_name) ? null :
            <div className="loan-app-total-container">
                <div className="loan-app-input-container">
                    <div className="first-step-app-container">
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">First Name</h4>
                            <input onChange={this.handleChange} className="afl-input" name="first_name" placeholder="First Name" value={this.state.first_name} />
                        </div>
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">Last Name</h4>
                            <input onChange={this.handleChange} className="afl-input" name="last_name" placeholder="Last Name" value={this.state.last_name} />
                        </div>
                    </div>
                    <div className="first-step-app-container">
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">SSN</h4>
                            <input onChange={this.handleChange} className="afl-input" name="ssn" placeholder="SSN" />
                        </div>
                    </div>
                    <div className="first-step-app-container">
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">Phone Number</h4>
                            <input onChange={this.handleChange} className="afl-input" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} />
                        </div>
                    </div>
                    <div className="first-step-app-container">
                        <div className="second-step-app-container ">
                            <h4 className="app-input-desc">City</h4>
                            <input onChange={this.handleChange} className="afl-input-address" name="city" placeholder="City" value={this.state.city} />
                        </div>
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">State</h4>
                            <input onChange={this.handleChange} className="afl-input-address" name="_state" placeholder="State" value={this.state._state} />
                        </div>
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">Zip Code</h4>
                            <input onChange={this.handleChange} className="afl-input-address" name="zip" placeholder="Zip Code" value={this.state.zip} />
                        </div>
                    </div>
                </div>
                <button onClick={this.handleSubmit} className="submit-account-button">Next</button>

            </div>

        return (
            <div>
                {applyForLoan}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { first_name, last_name, ssn, phone_number, city, zip, _state, account_number } = state.userInfoReducer

    return { first_name, last_name, ssn, phone_number, city, zip, _state, account_number }
}

export default connect(mapStateToProps, { updateUserInfo, updatePersonal })(AFLPersonalInfo)