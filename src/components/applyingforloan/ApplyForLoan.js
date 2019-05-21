import React, {Component} from "react"
import {connect} from "react-redux"
import axios from "axios"
import swal from "sweetalert"

//working on submitting loan info to server, server side needs to be done as well.

class ApplyForLoan extends Component{
    async componentDidMount(){
    let {type_of_loan, term_length, amount, employer, work_title, income} = this.props
    console.log(type_of_loan, term_length, amount, employer, work_title, income)
    try {
    await axios.post("/apply/loansubmit", {type_of_loan, term_length, amount, employer, work_title, income})
    swal("Loan Submitted", "Thank You!", "success")
    this.props.history.push("/info/account")
    }catch{
    swal("Loan Submission Failure", "We apologize for the inconvenience", "error")
    }
}
render(){
    return(
        
        <div>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    const {email, type_of_loan, amount, term_length, employer, work_title,income} = state.loanAppReducer
    return{email, type_of_loan, amount, term_length, employer, work_title,income}
}

export default connect(mapStateToProps)(ApplyForLoan)