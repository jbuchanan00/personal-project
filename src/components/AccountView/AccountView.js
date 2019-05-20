import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateUserInfo } from "../../redux/userInfoReducer"

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
        if (!this.state.first_name) {
            this.sessionInfo()
        }
    }

    sessionInfo = async () => {
        let session = await axios.get("/usersession")
        console.log(session.data)
        this.props.updateUserInfo(session.data)
    }

    render() {





        let autoLoanView = (this.state.autoLoan !== 0) ?

            <div className="account-balance-container">
                <div className="inside-container-balance">
                    <div className="type-of-account">
                        <p className="type-of-account-text">
                            Auto Loan
                        </p>
                    </div>
                    <span>${this.state.autoLoan}</span>
                </div>
                <button className="history-button">History</button>
            </div> : null

        let personalLoanView = (this.state.personalLoan !== 0) ?

            <div className="account-balance-container">
                <div className="inside-container-balance">
                    <div className="type-of-account">
                        <p className="type-of-account-text">
                            Personal Loan
                        </p>
                    </div>
                    <span>${this.state.personalLoan}</span>
                </div>
                <button className="history-button">History</button>
            </div> : null



        let loggedIn = (this.props.first_name) ?

            <div className="account-view-total">
                <div className="welcome-name">
                    Welcome {this.props.first_name}!
                    </div>
                <div className="account-balances-view">
                    <div className="account-balance-container">
                        <div className="inside-container-balance">
                            <div className="type-of-account">
                                <p className="type-of-account-text">
                                    Savings
                                </p>
                            </div>
                            <span>${this.state.savings}</span>
                        </div>
                        <button className="history-button">History</button>
                    </div>
                    <div className="account-balance-container">
                        <div className="inside-container-balance">
                            <div className="type-of-account">
                                <p className="type-of-account-text">
                                    Checkings
                                </p>
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
                                <p className="type-of-account-text">
                                    Credit Card
                                </p>
                            </div>
                            <span>${this.state.creditCard}</span>
                        </div>
                        <button className="history-button">History</button>
                    </div>
                </div>
            </div> : <p>You have not been logged in</p>
        let desktopAccountView;



        return (
            <div>
                {loggedIn}
                
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    const { first_name, lastName, accountNumber, isadmin } = state.userInfoReducer
    return { first_name, lastName, accountNumber, isadmin }
}




export default connect(mapStatetoProps, {updateUserInfo})(withRouter(AccountView))

