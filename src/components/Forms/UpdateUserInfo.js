import React, { Component } from "react"
import { connect } from "react-redux";
import axios from "axios"
import { updateUserInfo } from "../../redux/userInfoReducer"


class UpdateUserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone_number: "",
            street: "",
            city: "",
            zip: "",
            email: "",
            state: ""
        }
    }

    async componentDidMount() {
        let session = await axios.get("/usersession")
        this.props.updateUserInfo(session.data)
        this.setState({
            phone_number: this.props.phone_number,
            street: this.props.street,
            city: this.props.city,
            zip: this.props.zip,
            email: this.props.email,
            state: this.props.state
        })

    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async () => {
        let { account_number } = this.props
        let { phone_number, state, street, city, zip, email } = this.state
        await axios.put("/account/update", { account_number, phone_number, state, street, city, zip, email })
        window.location.reload()
    }
    handleCancel = () => {
        this.props.history.push("/info/account")
    }
    render() {
        let loggedIn = (this.props.account_number) ? <div>
            <div className="name-container"><h3 className="name-text">{this.props.first_name} {this.props.last_name}</h3></div>
            <div className="info-container">
            <p>Phone Number</p>
            <input placeholder="phone number" name="phone_number" onChange={this.handleChange} value={this.state.phone_number} className="info-input" />
            <p>Street Address</p>
            <input placeholder="street" name="street" onChange={this.handleChange} value={this.state.street} className="info-input"/>
            <p>City</p>
            <input placeholder="city" name="city" onChange={this.handleChange} value={this.state.city} className="info-input"/>
            <p>State</p>
            <input placeholder="state" name="state" onChange={this.handleChange} value={this.state.state} className="info-input"/>
            <p>Zip Code</p>
            <input placeholder="zip" name="zip" onChange={this.handleChange} value={this.state.zip} className="info-input"/>
            <p>Email</p>
            <input placeholder="email" name="email" onChange={this.handleChange} value={this.state.email} className="info-input"/>
            </div>
            <div className="button-container">
            <button onClick={this.handleSubmit} className="update-submit">Submit Changes</button>
            <button onClick={this.handleCancel}className="update-cancel">Cancel Changes</button>
            </div>
        </div> : null
        return (
            <div>
                {loggedIn}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { first_name, last_name, phone_number, street, city, zip, email, account_number } = state
    state = state.state
    return { first_name, last_name, phone_number, street, state, city, zip, email, account_number }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfo)