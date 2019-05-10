import React, {Component} from "react"
import { connect } from "react-redux";



class NewAccount extends Component{
    
    buttonHandle = () => {
        this.props.history.push("/info/account")
    }
    render(){
    return(
        <div>
        <p>Thank you for creating your new account!</p>
        <p>Your account number is {this.props.account_number}</p>
        <button onClick={this.buttonHandle}>Go To Account</button>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    let {account_number} = state
    return {account_number}
}

export default connect(mapStateToProps)(NewAccount)