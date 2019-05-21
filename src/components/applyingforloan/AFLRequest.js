import React, { Component } from "react"
import { connect } from "react-redux";
import Select from "react-select"
import axios from "axios"
import { updateUserInfo } from "../../redux/userInfoReducer"
import { updateRequest } from "../../redux/loanAppReducer"

class AFLRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type_of_loan: "",
            term_length: 0,
            amount: 0,
            loan_type_tag: ""
        }
    }
    async componentDidMount() {
        let session = await axios.get("/usersession")
        this.props.updateUserInfo(session.data)
    }

    handleSelect = (loan_type) => {
        this.setState({
            type_of_loan: loan_type.value,
            loan_type_tag: loan_type.label
        })
    }
    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = () => {
        this.props.updateRequest(this.state)
        this.props.history.push("/apply/submitted")
    }
    render() {
        let placeholderLoan = (!this.state.type_of_loan) ? <p>Select Loan Type</p> : <p>{this.state.loan_type_tag}</p>

        const options = [
            { value: "auto_loan", label: "Auto Loan" },
            { value: "personal_loan", label: "Personal Loan" },
            { value: "credit_card", label: "Credit Card" }
        ]
        let loanRequest = (!this.props.employer) ? null :
            <div className="loan-app-total-container">
                <div className="loan-request-input-container">
                    <div className="loan-request-container">
                        <div className="second-step-app-container">
                            <h4 className="app-input-desc">Loan Type</h4>
                            <Select options={options} value={this.state.type_of_loan} onChange={this.handleSelect} className="loan-select-menu" placeholder={placeholderLoan} />
                        </div>

                    </div>
                    <div className="second-step-app-container">
                        <h4 className="app-input-desc">Term Length (in months)</h4>
                        <div className="loan-request-container">
                            <input className="loan-request-input" onChange={this.handleChange} name="term_length" placeholder="Term Length" />
                        </div>
                    </div>
                    <div className="second-step-app-container">
                        <h4 className="app-input-desc">Amount Requested</h4>
                        <div className="loan-request-container">
                            <input className="loan-request-input" onChange={this.handleChange} name="amount" placeholder="Amount Requested" />
                        </div>
                    </div>
                </div>
                <button onClick={this.handleSubmit} className="submit-account-button">Submit</button>
            </div>
        return (
            <div>
                {loanRequest}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { first_name, employer } = state.loanAppReducer
    return { first_name, employer }
}

export default connect(mapStateToProps, { updateUserInfo, updateRequest })(AFLRequest)