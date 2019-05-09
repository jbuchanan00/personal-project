import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import axios from "axios"
import {updateUserInfo} from "../redux/userInfoReducer"

class LoginForm extends Component{
    constructor(){
        super()
        this.state = {
            usernameEmail: "",
            password: ""
        }
    }

    inputChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
        
    }
    loginClick = async () => {
        const {usernameEmail, password} = this.state
        const res = await axios.post("/auth/login", {usernameEmail, password})
        this.props.updateUserInfo(res.data)
        this.props.history.push("/info/account")
        this.setState({
            usernameEmail: "",
            password: ""
        })
    }

    render(){
        return(
            <div>
                <h2>Login</h2>
                <h5>Username or Email</h5>
                <input name="usernameEmail" value={this.state.usernameEmail} onChange={this.inputChange} placeholder="Username or Email"></input>
                <h5>Password</h5>
                <input name="password" value={this.state.password} onChange={this.inputChange} placeholder="password"></input>
                <button onClick={this.loginClick}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(null, mapDispatchToProps)(withRouter(LoginForm))