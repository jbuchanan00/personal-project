import React, {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

class AccountView extends Component{
    constructor(){
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

    componentDidMount(){
        axios.get("/info/account").then(res => {
            const {savings_balance, checkings_balance, auto_loan_balance, personal_loan_balance, credit_card_balance} = res.data
            this.setState({
                savings: savings_balance,
                checkings: checkings_balance,
                autoLoan: auto_loan_balance,
                personalLoan: personal_loan_balance,
                creditCard: credit_card_balance
            })
        })
    }

    render(){
        let autoLoanView;
        let personalLoanView;
        let adminControl;

        if(this.state.autoLoan !== 0){
            autoLoanView = <p>{this.state.autoLoan}</p>
        }
        if(this.state.personalLoan !== 0){
            personalLoanView = <p>{this.state.personalLoan}</p>
        }
        if(this.props.isadmin){
            adminControl = 
            <div>
            <button>Deposit</button>
            <button>Withdrawal</button>
            </div>
        }
        

        return(
            <div>
                Welcome {this.props.first_name}
                <div>
                    <p>Savings: {this.state.savings}</p>{adminControl}
                    <p>Checkings: {this.state.checkings}</p>{adminControl}
                    {autoLoanView}
                    {personalLoanView}
                    <p>Credit Card: {this.state.creditCard}</p>{adminControl}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    const {first_name, lastName, accountNumber, isadmin} = state
    console.log(first_name)
    return {first_name, lastName, accountNumber, isadmin}
}


export default connect(mapStatetoProps)(withRouter(AccountView))

