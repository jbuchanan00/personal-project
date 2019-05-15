import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import DeleteUser from "../DeleteUser"
import UpdateBalanceForm from "./UpdateBalanceForm";
import { updateUserInfo } from "../../redux/userInfoReducer"
import WithdrawalBalanceForm from "./WithdrawalBalanceForm"

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
            email: "",
            saved_account_number: "",
            windowOpen: false,
            windowOpenString: "false",
            withdrawOpen: false,
            withdrawWindowOpenString: "false",
            ableToFindAccount: true
        }
    }

    async componentDidMount() {
        try {
            let session = await axios.get("/usersession")
            this.props.updateUserInfo(session.data)
        }
        catch (error) {
            console.log(error)
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
            if(this.state.ssn){
                window.location.reload()
            }
            if(!res.data[0]){return (
            this.setState({
                ableToFindAccount: false
            }))}
            
            let { ssn, birthday, savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance,
                credit_card_balance, email } = res.data[0]
            this.setState({
                saved_account_number: account_number
            })
            this.setState({
                ssn,
                birthday,
                savings: savings_balance,
                checkings: checkings_balance,
                auto_loan: auto_loan_balance,
                personal_loan: personal_loan_balance,
                credit_card: credit_card_balance,
                account_number: "",
                email,
                ableToFindAccount: true

            })
        })

    }
    depositButton = () => {
        this.setState({
            windowOpen: !this.state.windowOpen
        })
        if (this.state.windowOpen) {
            this.setState({
                windowOpenString: "false"
            })
        } else {
            this.setState({
                windowOpenString: "true"
            })
        }

    }
    withdrawButton = () => {
        this.setState({
            withdrawOpen: !this.state.withdrawOpen
        })
        if (this.state.withdrawOpen) {
            this.setState({
                withdrawWindowOpenString: "false"
            })
        } else {
            this.setState({
                withdrawWindowOpenString: "true"
            })
        }
    }
    reloadPage = () => {
        window.location.reload()
    }


    render() {
        let { saved_account_number } = this.state
        let adminStatus;

        let accountFalse = (this.state.ableToFindAccount) ? null : <h2>Unable to find account</h2>
        let accountAlreadyFound = (this.state.ssn) ? <button onClick={this.reloadPage} className="find-account-button">Exit Account</button> : 
        <div className="input-button-teller-container">
        <input name="account_number" value={this.state.account_number} onChange={this.accountNumberChange} className="account-find-input"></input>
        <button onClick={this.sumbitAccountNumber} className="find-account-button">Get Account</button>
        </div>
        if (!this.props.isadmin) {
            adminStatus = <h1>Unauthorized Access</h1>
        } else {
            adminStatus =
                <div className="teller-find-account">
                    <div className="welcome-teller-name">Hello {this.props.first_name}</div>
                    
                        {accountAlreadyFound}
                        
                    
                </div>
        }
        let accountFound = !this.state.ssn ? null : (<div>
            <div className="teller-customer-info">
                <div className="teller-account-view-specific">Acct:{this.state.saved_account_number}</div>


                <div className="teller-account-view-specific">{this.state.first_name} {this.state.last_name}</div>



            </div>
            <div className="teller-account-container">
                <div className="account-view-teller">
                    <div className="specific-view-teller">Savings: {this.state.savings}</div>

                </div>
                <div className="account-view-teller">
                    <div className="specific-view-teller">Checkings: {this.state.checkings}</div>

                </div>
                <div className="account-view-teller">
                    <div className="specific-view-teller">Auto Loan: {this.state.auto_loan}</div>

                </div>
                <div className="account-view-teller">
                    <div className="specific-view-teller">Personal Loan: {this.state.personal_loan}</div>

                </div>
                <div className="account-view-teller">
                    <div className="specific-view-teller">Credit Card: {this.state.credit_card}</div>

                </div>
            </div>
            <button onClick={this.depositButton} className="teller-buttons">Deposit</button><button onClick={this.withdrawButton} className="withdraw-button ">Withdrawal</button>

            <UpdateBalanceForm windowOpen={this.state.windowOpenString} windowToggle={this.depositButton} account_number={this.state.saved_account_number} />

            <WithdrawalBalanceForm windowOpen={this.state.withdrawWindowOpenString} windowToggle={this.withdrawButton} account_number={this.state.saved_account_number} />

            <div className="email-delete-container">
                <div className="specific-view-teller">{this.state.email}</div>
                <DeleteUser email={this.state.email} account_number={saved_account_number} />
            </div>
        </div>)

        return (
            <div>
                {adminStatus}
                {accountFalse}
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

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(TellerView)