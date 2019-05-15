import React, { Component } from "react"
import { connect } from "react-redux";



class NewAccount extends Component {

    buttonHandle = () => {
        this.props.history.push("/info/account")
    }
    render() {
        return (
            <div className="welcome-container">
                <div className="welcome-text">
                    <p>Thank you for creating your new account {this.props.first_name}!</p>
                    <p>Your account number is {this.props.account_number}</p>
                </div>
                <button onClick={this.buttonHandle} className="go-to-button">Go To Account</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { account_number, first_name} = state
    return { account_number, first_name }
}

export default connect(mapStateToProps)(NewAccount)