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
            _state: "",
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
        let { first_name, last_name, email, username, password, birthday, ssn, phone_number, street, city, _state, zip } = this.state
        let res = await axios.post("/auth/createaccount", { first_name, last_name, email, username, password, birthday, ssn, phone_number, street, city, _state, zip })
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
            _state: "",
            zip: "",

        })
    }
    cancelAccount = () => {
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="create-body">
                <div className="full-create-account-container">
                    <div className="first-step-container">
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>First Name</span>
                            </div>
                            <input name="first_name" value={this.state.first_name} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>Last Name</span>
                            </div>
                            <input className="create-account-input" name="last_name" value={this.state.last_name} onChange={this.inputChange}></input>
                        </div>
                    </div>
                    <div className="first-step-container">
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>Phone Number</span>
                            </div>
                            <input name="phone_number" value={this.state.phone_number} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>email</span>
                            </div>
                            <input name="email" value={this.state.email} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>username</span>
                            </div>
                            <input name="username" value={this.state.username} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>password</span>
                            </div>
                            <input name="password" value={this.state.password} onChange={this.inputChange} type="password" className="create-account-input"></input>
                        </div>
                    </div>
                    <div className="first-step-container">
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>birthday</span>
                            </div>
                            <input name="birthday" value={this.state.birthday} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>social security number</span>
                            </div>
                            <input name="ssn" value={this.state.ssn} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                    </div>
                    <div className="first-step-container">
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>street address</span>
                            </div>
                            <input name="street" value={this.state.street} onChange={this.inputChange} className="create-account-input"></input>
                        </div>
                        <div className="specific-input-container">
                            <div className="create-span-container">
                                <span>city</span>
                            </div>
                            <input name="city" value={this.state.city} onChange={this.inputChange} className="create-account-input"></input>
                        </div>

                        <div className="state-zip-container">
                            <div className="state-container">
                                <div className="create-span-container">
                                    <span>state</span>
                                </div>
                                <input name="_state" value={this.state._state} onChange={this.inputChange} className="state-zip-input"></input>
                            </div>
                            <div className="zip-container">
                                <div className="create-span-container">
                                    <span>zip</span>
                                </div>
                                <input name="zip" value={this.state.zip} onChange={this.inputChange} className="state-zip-input"></input>
                            </div>
                        </div>
                    </div>
                    <div className="create-account-button-container">
                        <button className="submit-account-button" onClick={this.submitAccount}>Submit</button>
                        <button className="cancel-account-button" onClick={this.cancelAccount}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(null, mapDispatchToProps)(CreateAccount)