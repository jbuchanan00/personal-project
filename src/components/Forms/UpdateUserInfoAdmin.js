import React, { Component } from "react"
import { connect } from "react-redux";
import { updateUserInfo } from "../../redux/userInfoReducer"
import axios from "axios"

class UpdateUserInfoAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account_number: "",
            saved_account_number: "",
            first_name: "",
            last_name: "",
            isadmin: null,
            phone_number: "",
            street: "",
            city: "",
            zip: "",
            email: "",
            _state: "",
            username: ""
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
    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    toggleAdmin = () => {
        this.setState({
            isadmin: !this.state.isadmin
        })
    }

    getUserInfo = () => {
        let { account_number } = this.state
        axios.post("/teller/updateinfo", { account_number }).then(res => {
            let { first_name, last_name, isadmin, phone_number, street, city, zip, email, _state, username } = res.data
            this.setState({
                first_name,
                last_name,
                isadmin,
                phone_number,
                _state,
                street,
                city,
                email,
                zip,
                saved_account_number: account_number,
                account_number: "",
                username
            })
        })
    }
    handleSubmit = () => {
        const { first_name, last_name, isadmin, phone_number, _state, street, city, zip, email, username } = this.state
        axios.put("/teller/updateinfoteller", { first_name, last_name, isadmin, phone_number, _state, street, city, zip, email, username }).then(res => {
            console.log(res)
            // window.location.reload()
        })
    }
    handleCancel = () => {
        this.setState({
            account_number: "",
            saved_account_number: "",
            first_name: "",
            last_name: "",
            isadmin: null,
            phone_number: "",
            street: "",
            city: "",
            zip: "",
            email: "",
            _state: ""
        })
    }
    reloadPage = () => {
        window.location.reload()
    }

    render() {
        let adminStatus = (this.state.isadmin) ?
            <div className="admin-boolean-container">
                <p className="text-admin-true">Is an Employee</p>
                <button className="admin-is-true" onClick={this.toggleAdmin}>Toggle</button>
            </div> :
            <div className="admin-boolean-container">
                <p className="text-admin-false">Not an employee</p>
                <button className="admin-is-false" onClick={this.toggleAdmin}>Toggle</button>
            </div>

        let accountAlreadyFound = (this.state.saved_account_number) ? <button onClick={this.reloadPage} className="find-account-button">Exit Account</button> : <div>
            <div className="input-button-teller-container">

                <input name="account_number" className="account-find-input-info" onChange={this.handleChange} value={this.state.account_number} />

                <button className="find-account-button-info" onClick={this.getUserInfo}>Get Account</button>
            </div>
            <h3 className="welcome-teller-name">INFO</h3>
        </div>

        let adminUse = (this.props.isadmin) ?
            <div className="update-info-teller-container">
                <div className="teller-find-account-info">
                    <div className="welcome-teller-name">Hello {this.props.first_name}</div>
                    <div>
                        {accountAlreadyFound}
                    </div>

                </div>
            </div> : <h1>Access Denied</h1>

        let accountFound = (!this.state.first_name) ? null :
            <div>
                <div className="admin-info-container">
                    <div className="desktop-info-container">
                        <p className="udpate-description">First Name</p>
                        <input placeholder="first name" name="first_name" value={this.state.first_name} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">Last Name</p>
                        <input placeholder="last name" name="last_name" value={this.state.last_name} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">Admin Status</p>
                        {adminStatus}
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">Phone Number</p>
                        <input placeholder="phone number" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">Street Address</p>
                        <input placeholder="street" name="street" value={this.state.street} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">City</p>
                        <input placeholder="city" name="city" value={this.state.city} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">Zip Code</p>
                        <input placeholder="zip" name="zip" value={this.state.zip} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">State</p>
                        <input placeholder="state" name="_state" value={this.state._state} onChange={this.handleChange} className="info-input" />
                    </div>
                    <div className="desktop-info-container">
                        <p className="udpate-description">Email</p>
                        <input placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} className="info-input" />
                    </div>
                </div>
                <div>
                    <button className="update-submit" onClick={this.handleSubmit}>Submit Changes</button>
                    <button className="update-cancel" onClick={this.handleCancel}>Cancel Changes</button>
                </div>

            </div>

        return (
            <div>
                {adminUse}
                {accountFound}
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

const mapStateToProps = (state) => {
    let { first_name, isadmin, last_name } = state
    return { first_name, isadmin, last_name }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoAdmin)