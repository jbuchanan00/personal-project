import React, { Component } from "react"
import { connect } from "react-redux"
import { updateEmployment } from "../../redux/loanAppReducer"
import axios from "axios"
import { updateUserInfo } from "../../redux/userInfoReducer"

class AFLEmploymentInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employer: "",
            work_title: "",
            income: 0,
            ssn: this.props.ssn
        }
    }
    async componentDidMount() {
        let session = await axios.get("/usersession")
        this.props.updateUserInfo(session.data)
    }
    handleSubmit = () => {
        this.props.updateEmployment(this.state)
        this.props.history.push("/apply/3")

    }
    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {

        let employementInput = (!this.state.ssn) ? null :
            <div className="loan-app-total-container">
                <div className="employment-input-container">
                    <div className="second-step-app-container">
                        <h4 className="app-input-desc">Employer</h4>
                        <input className="employement-input" onChange={this.handleChange} name="employer" placeholder="Employer" />
                    </div>
                    <div className="second-step-app-container">
                        <h4 className="app-input-desc">Title</h4>
                        <input className="employement-input" onChange={this.handleChange} name="work_title" placeholder="Title" />
                    </div>
                    <div className="second-step-app-container">
                        <h4 className="app-input-desc">Monthly Gross Income</h4>
                        <input className="employement-input" onChange={this.handleChange} name="income" placeholder="Income" />
                    </div>
                </div>
                <button onClick={this.handleSubmit} className="submit-account-button">Next</button>
            </div>

        return (
            <div>
                {employementInput}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { ssn } = state.loanAppReducer
    return { ssn }
}

export default connect(mapStateToProps, { updateEmployment, updateUserInfo })(AFLEmploymentInfo)