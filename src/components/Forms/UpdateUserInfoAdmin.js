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
            state: "",
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
            let { first_name, last_name, isadmin, phone_number, street, city, zip, email, state, username } = res.data
            this.setState({
                first_name,
                last_name,
                isadmin,
                phone_number,
                state,
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
        const { first_name, last_name, isadmin, phone_number, state, street, city, zip, email, username } = this.state
        axios.put("/teller/updateinfoteller", { first_name, last_name, isadmin, phone_number, state, street, city, zip, email, username }).then(res => {
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
            state: ""
        })
    }

    render() {
        let adminUse = (this.props.isadmin) ?
            <div>
                <div className="welcome-teller-name">Hello {this.props.first_name}</div>
                <div>

                    <input placeholder="search for account" name="account_number" className="account-find-input" onChange={this.handleChange} value={this.state.account_number} />
                    <div className="teller-find-account">
                        <button className="find-account-button" onClick={this.getUserInfo}>Get Account</button>
                    </div>
                </div>
            </div> : null

        let accountFound = (!this.state.first_name) ? null :
            <div>
                <div className="admin-info-container">
                    <p>First Name</p>
                    <input placeholder="first name" name="first_name" value={this.state.first_name} onChange={this.handleChange} className="info-input"/>
                    <p>Last Name</p>
                    <input placeholder="last name" name="last_name" value={this.state.last_name} onChange={this.handleChange} className="info-input"/>
                    <p>Admin Status</p>
                    <p>{this.state.isadmin}</p><button onClick={this.toggleAdmin}>Admin</button>
                    <p>Phone Number</p>
                    <input placeholder="phone number" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} className="info-input"/>
                    <p>Street Address</p>
                    <input placeholder="street" name="street" value={this.state.street} onChange={this.handleChange} className="info-input"/>
                    <p>City</p>
                    <input placeholder="city" name="city" value={this.state.city} onChange={this.handleChange} className="info-input"/>
                    <p>Zip Code</p>
                    <input placeholder="zip" name="zip" value={this.state.zip} onChange={this.handleChange} className="info-input"/>
                    <p>State</p>
                    <input placeholder="state" name="state" value={this.state.state} onChange={this.handleChange} className="info-input"/>
                    <p>Email</p>
                    <input placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} className="info-input"/>
                </div>
                <div>
                    <button onClick={this.handleSubmit}>Submit Changes</button>
                    <button onClick={this.handleCancel}>Cancel Changes</button>
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