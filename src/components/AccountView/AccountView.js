import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {updateUserInfo} from "../../redux/userInfoReducer"

class AccountView extends Component {
    constructor() {
        super()
        this.state = {
            first_name: "",
            lastName: "",
            savings: 0,
            checkings: 0,
            autoLoan: 0,
            personalLoan: 0,
            creditCard: 0
        }
    }

    componentDidMount() {
        axios.get("/info/account").then(res => {
            const { savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance } = res.data
            this.setState({
                savings: savings_balance,
                checkings: checkings_balance,
                autoLoan: auto_loan_balance,
                personalLoan: personal_loan_balance,
                creditCard: credit_card_balance
            })
        })
        if(!this.state.first_name){
        this.sessionInfo()}
    }

    sessionInfo = async () => {
        let session = await axios.get("/usersession")
        this.props.updateUserInfo(session.data)
    }

    render() {
        let loggedIn;
        let autoLoanView;
        let personalLoanView;
        let notLoggedIn;

        if (this.state.autoLoan !== 0) {
            autoLoanView =
                <div className="account-balance-container">
                    <div className="inside-container-balance">
                    <div className="type-of-account">
                    Auto Loan  
                    </div>
                    <span>${this.state.autoLoan}</span>
                    </div>
                    <button className="history-button">History</button>
                </div>
        }
        if (this.state.personalLoan !== 0) {
            personalLoanView =
                <div className="account-balance-container">
                    <div className="inside-container-balance">
                    <div className="type-of-account">
                    Personal Loan 
                    </div>
                    <span>${this.state.personalLoan}</span>
                    </div>
                    <button className="history-button">History</button>
                </div>
        }

        
        if (this.props.first_name) {
            (loggedIn =
                <div className="account-view-total">
                    <div className="welcome-name">
                        Welcome {this.props.first_name}!
                    </div>
                    <div className="account-balances-view">
                        <div className="account-balance-container">
                            <div className="inside-container-balance">
                            <div className="type-of-account">
                            Savings
                            </div>
                            <span>${this.state.savings}</span>
                            </div>
                            <button className="history-button">History</button>
                        </div>
                        <div className="account-balance-container">
                            <div className="inside-container-balance">
                            <div className="type-of-account">
                            Checkings
                            </div>
                            <span>${this.state.checkings}</span>
                            </div>
                            <button className="history-button">History</button>
                        </div>
                        {autoLoanView}
                        {personalLoanView}
                        <div className="account-balance-container">
                            <div className="inside-container-balance">
                            <div className="type-of-account">
                            Credit Card
                            </div>
                            <span>${this.state.creditCard}</span>
                            </div>
                            <button className="history-button">History</button>
                        </div>
                    </div>
                </div>)
        } else {
            (notLoggedIn =
                <p>You have not been logged in</p>)
        }


        return (
            <div>
                {loggedIn}
                {notLoggedIn}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    const { first_name, lastName, accountNumber, isadmin } = state
    return { first_name, lastName, accountNumber, isadmin }
}

const mapDispatchToProps = {
    updateUserInfo
}


export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(AccountView))

