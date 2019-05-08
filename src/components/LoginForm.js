import React, {Component} from "react"

export default class LoginForm extends Component{
    constructor(){
        super()
        this.state = {
            usernameEmail: "",
            password: ""
        }
    }

    inputChange = (e) => {
        let {name, value} = e.target
        
        console.log(name, value)
    }
    render(){
        return(
            <div>
                <h2>Login</h2>
                <h5>Username or Email</h5>
                <input name="usernameEmail" value={this.state.usernameEmail} onChange={this.inputChange}></input>
                <h5>Password</h5>
                <input name="password" value={this.state.password} onChange={this.inputChange}></input>
            </div>
        )
    }
}