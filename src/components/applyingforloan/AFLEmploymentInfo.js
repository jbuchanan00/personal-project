import React, {Component} from "react"
import {connect} from "react-redux"
import {updateEmployment} from "../../redux/loanAppReducer"
import axios from "axios"
import {updateUserInfo} from "../../redux/userInfoReducer"

class AFLEmploymentInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            employer: "",
            work_title: "",
            income: 0,
            ssn: this.props.ssn
        }
    }
    async componentDidMount(){
        let session = await axios.get("/usersession")
        this.props.updateUserInfo(session.data)
    }
    handleSubmit = () => {
        this.props.updateEmployment(this.state)
        this.props.history.push("/apply/3")
        
    }
    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    render(){

        let employementInput = (!this.state.ssn) ? null :
        <div>
            <div className="employement-input-container">
            <input className="employement-input" onChange={this.handleChange} name="employer" placeholder="Employer" />
            <input className="employement-input" onChange={this.handleChange} name="title" placeholder="Title" />
            <input className="employement-input" onChange={this.handleChange} name="income" placeholder="Income" />
            </div>
            <button onClick={this.handleSubmit}>Next</button>
        </div>

        return(
            <div>
                {employementInput}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {ssn} = state.loanAppReducer
    return {ssn}
}

export default connect(mapStateToProps, {updateEmployment, updateUserInfo})(AFLEmploymentInfo)