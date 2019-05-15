import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { updateUserInfo } from "../../redux/userInfoReducer"


class CreateAccount extends Component {
    constructor() {
        super()
        //username, first_name, last_name, email, hash, birthday, ssn, phone_number, street, city,
        //state, zip, account_number
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
            ssn: "",
            phone_number: "",
            street: "",
            city: "",
            state: "",
            zip: ""

        }
    }

    inputChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    submitAccount = async () => {
        let { first_name, last_name, email, username, password, birthday, ssn, phone_number, street, city, state, zip } = this.state
        let res = await axios.post("/auth/createaccount", { first_name, last_name, email, username, password, birthday, ssn, phone_number, street, city, state, zip })
        console.log(res.data)
        this.props.updateUserInfo(res.data)
        this.props.history.push("/info/newaccount")
        this.setState({
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
            ssn: "",
            phone_number: "",
            street: "",
            city: "",
            state: "",
            zip: "",

        })
    }
    cancelAccount = () => {
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="full-create-account-container">
                <div className="first-step-container">
                    <div className="specific-input-container">
                        <span>First Name</span>
                        <input name="first_name" value={this.state.first_name} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                    <div className="specific-input-container">
                        <span>Last Name</span>
                        <input className="create-account-input" name="last_name" value={this.state.last_name} onChange={this.inputChange}></input>
                    </div>
                    <div className="specific-input-container">
                        <span>Phone Number</span>
                        <input name="phone_number" value={this.state.phone_number} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                </div>
                <div className="first-step-container">
                    <div className="specific-input-container">
                        <span>email</span>
                        <input name="email" value={this.state.email} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                    <div className="specific-input-container">
                        <span>username</span>
                        <input name="username" value={this.state.username} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                    <div className="specific-input-container">
                        <span>password</span>
                        <input name="password" value={this.state.password} onChange={this.inputChange} type="password" className="create-account-input"></input>
                    </div>
                </div>
                <div className="first-step-container">
                    <div className="specific-input-container">
                        <span>birthday</span>
                        <input name="birthday" value={this.state.birthday} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                    <div className="specific-input-container">
                        <span>social security number</span>
                        <input name="ssn" value={this.state.ssn} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                </div>
                <div className="first-step-container">
                    <div className="specific-input-container">
                        <span>street address</span>
                        <input name="street" value={this.state.street} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                    <div className="specific-input-container">
                        <span>city</span>
                        <input name="city" value={this.state.city} onChange={this.inputChange} className="create-account-input"></input>
                    </div>
                    <div className="state-zip-container">
                        <div className="state-container">
                            <span>state</span>
                            <input name="state" value={this.state.state} onChange={this.inputChange} className="state-zip-input"></input>
                        </div>
                        <div className="zip-container">
                            <span>zip</span>
                            <input name="zip" value={this.state.zip} onChange={this.inputChange} className="state-zip-input"></input>
                        </div>
                    </div>
                </div>
                <div className="create-account-button-container">
                    <button className="submit-account-button" onClick={this.submitAccount}>Submit</button>
                    <button className="cancel-account-button" onClick={this.cancelAccount}>Cancel</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(null, mapDispatchToProps)(CreateAccount)