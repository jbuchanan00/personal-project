import React from "react"
import {connect} from "react-redux"
import axios from "axios"

//working on submitting loan info to server, server side needs to be done as well.

function applyForLoan(props){
    let {email, type_of_loan, term_length, amount, employer, work_title, income} = this.props
    let submitLoanInfo = async () => {
        await axios.post("")
    }
    return(
        
        <div>
            Thank you for Applying!
        </div>
    )
}

const mapStateToProps = (state) => {
    const {email, type_of_loan, amount, term_length, employer, work_title,income} = state.loanAppReducer
    return{email, type_of_loan, amount, term_length, employer, work_title,income}
}

export default connect(mapStateToProps)(applyForLoan)