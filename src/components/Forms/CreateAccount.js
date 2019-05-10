import React, { Component } from "react"
import axios from "axios"
import {connect} from "react-redux"
import {updateUserInfo} from "../../redux/userInfoReducer"


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
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    submitAccount = async () => {
        let {first_name, last_name, email, username, password, birthday, ssn, phone_number, street, city, state, zip} = this.state
        let res = await axios.post("/auth/createaccount", {first_name, last_name, email, username, password, birthday, ssn, phone_number, street, city, state, zip})
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
    render() {
        return (
            <div>
                <div>
                    <div>
                        <span>First Name</span>
                        <input name="first_name" value={this.state.first_name} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>Last Name</span>
                        <input name="last_name" value={this.state.last_name} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <input name="phone_number" value={this.state.phone_number} onChange={this.inputChange}></input>
                    </div>
                </div>
                <div>
                    <div>
                        <span>email</span>
                        <input name="email" value={this.state.email} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>username</span>
                        <input name="username" value={this.state.username} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>password</span>
                        <input name="password" value={this.state.password} onChange={this.inputChange} type="password"></input>
                    </div>
                </div>
                <div>
                    <div>
                        <span>birthday</span>
                        <input name="birthday" value={this.state.birthday} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>social security number</span>
                        <input name="ssn" value={this.state.ssn} onChange={this.inputChange}></input>
                    </div>
                </div>
                <div>
                    <div>
                        <span>street address</span>
                        <input name="street" value={this.state.street} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>city</span>
                        <input name="city" value={this.state.city} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>state</span>
                        <input name="state" value={this.state.state} onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <span>zip</span>
                        <input name="zip" value={this.state.zip} onChange={this.inputChange}></input>
                    </div>
                </div>
                <button onClick={this.submitAccount}>Submit</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(null, mapDispatchToProps)(CreateAccount)