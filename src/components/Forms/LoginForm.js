import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { updateUserInfo } from "../../redux/userInfoReducer"

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            usernameEmail: "",
            password: ""
        }
    }

    inputChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    loginClick = async () => {
        const { usernameEmail, password } = this.state
        const res = await axios.post("/auth/login", { usernameEmail, password })
        console.log(res.data)
        this.props.updateUserInfo(res.data)
        this.setState({
            usernameEmail: "",
            password: ""
        })
        if(res.data.isadmin){
            this.props.history.push("/teller/account")
        }else{
        this.props.history.push("/info/account")
        }
    }

    render() {
        return (
            <div className="login-body">
                <div className="login-container">
                    <h2 className="login-text">Login</h2>
                    <div className="login-text-input">
                        <div className="usernameEmail-container">
                            <h5 className="input-description">Username or Email</h5>
                            <input className="usernameEmail" name="usernameEmail" value={this.state.usernameEmail} onChange={this.inputChange} placeholder="Username or Email"></input>
                        </div>
                        <div className="password-container">
                            <h5 className="input-description">Password</h5>
                            <input className="login-password" name="password" value={this.state.password} onChange={this.inputChange} placeholder="password" type="password"></input>
                        </div>
                        <button onClick={this.loginClick} className="login-button">Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(null, mapDispatchToProps)(LoginForm)