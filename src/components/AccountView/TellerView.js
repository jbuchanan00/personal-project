import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import DeleteUser from "../DeleteUser"

//use info from redux.  additional info get through axios calls including ssn, bday.

class TellerView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savings: 0,
            checkings: 0,
            auto_loan: 0,
            personal_loan: 0,
            credit_card: 0,
            account_number: "",
            ssn: "",
            birthday: "",
            email: ""
        }
    }


    accountNumberChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    sumbitAccountNumber = () => {
        let { account_number } = this.state
        axios.post("/account/teller", { account_number }).then(res => {
            let { ssn, birthday, savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance,
                credit_card_balance, email } = res.data[0]
            this.setState({
                ssn,
                birthday,
                savings: savings_balance,
                checkings: checkings_balance,
                auto_loan: auto_loan_balance,
                personal_loan: personal_loan_balance,
                credit_card: credit_card_balance,
                account_number: "",
                email
                
            })
        })
    }


    render() {
        let adminStatus;
        if (!this.props.isadmin) {
            adminStatus = <h1>Unauthorized Access</h1>
        } else {
            adminStatus =
                <div>
                    <div>Hello</div>
                    <div>{this.props.first_name}</div>
                    <input name="account_number" value={this.state.account_number} onChange={this.accountNumberChange}></input>
                    <button onClick={this.sumbitAccountNumber}>Get Account</button>
                </div>
        }
        let accountFound = !this.state.ssn ? null : (<div>
            <div className="teller-customer-info">
                <div>{this.state.ssn}</div>
            </div>
            <div className="teller-customer-info">
                <div>{this.state.birthday}</div>
            </div>
            <div className="teller-account-container">
                <div className="account-view-teller">
                    <div>Savings: {this.state.savings}</div>
                    <button className="teller-buttons">Deposit</button><button className="teller-buttons">Withdrawal</button>
                </div>
                <div className="account-view-teller">
                    <div>Checkings: {this.state.checkings}</div>
                    <button className="teller-buttons">Deposit</button><button className="teller-buttons">Withdrawal</button>
                </div>
                <div className="account-view-teller">
                    <div>Auto Loan: {this.state.auto_loan}</div>
                    <button className="teller-buttons">Payment</button>
                </div>
                <div className="account-view-teller">
                    <div>Personal Loan: {this.state.personal_loan}</div>
                    <button className="teller-buttons">Payment</button>
                </div>
                <div className="account-view-teller">
                    <div>Credit Card: {this.state.credit_card}</div>
                    <button className="teller-buttons">Payment</button><button className="teller-buttons">Withdrawal</button>
                    <div>{this.state.email}</div>
                </div>
                <DeleteUser email={this.state.email}/>
            </div>
        </div>)
        return (
            <div>
                {adminStatus}
                {accountFound}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { first_name, last_name, email, isadmin, street, city, zip, phone_number, account_number } = state
    state = state.state
    return { first_name, last_name, email, isadmin, street, city, zip, phone_number, state, account_number }
}

export default connect(mapStateToProps)(TellerView)