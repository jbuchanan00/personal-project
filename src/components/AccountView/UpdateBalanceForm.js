import React, { Component } from "react"
import axios from "axios";
import Select from "react-select"
import { connect } from "react-redux"

class UpdateBalanceForm extends Component {
    constructor() {
        super()
        this.state = {
            account_type: "",
            amount: 0,
            account_type_tag: ""
        }
    }

    handleInput = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSelect = (account_type) => {
        
        this.setState({
            account_type: account_type.value,
            account_type_tag: account_type.label
        })
    }

    handleSubmit = async () => {
        let { account_number } = this.props
        let { amount, account_type } = this.state
        await axios.put("/update/balance", { account_number, account_type, amount })
        window.location.reload()
    }


    render() {
        let placeholderAccount = (!this.state.account_type) ? <p>Select Account</p> : <p>{this.state.account_type_tag}</p>
        const options = [
            { value: "checkings", label: "Checkings" },
            { value: "savings", label: "Savings" },
            { value: "auto_loan", label: "Auto Loan" },
            { value: "personal_loan", label: "Personal Loan" },
            { value: "credit_card", label: "Credit Card" }
        ]
        let window = (this.props.windowOpen === "true") ? <div className="deposit-verification">
            <div className="type-of-account-dw">{this.state.account_type_tag}</div>
            <div className="select-input-container">
                <Select options={options} value={this.state.account_type} onChange={this.handleSelect} name={this.state.account_type} className="select-menu" placeholder={placeholderAccount} />
                <input onChange={this.handleInput} placeholder="amount" name="amount" className="amount-input"></input>
            </div>
            <div className="update-balance-buttons">
                <button className="confirm-balance-change" onClick={ this.handleSubmit}>Confirm
                </button>
                <button onClick={this.props.windowToggle} className="cancel-balance-change">Cancel</button>
            </div>
        </div> : null
        return (
            <div>
                {window}
            </div>
        )
    }
}

export default connect()(UpdateBalanceForm)