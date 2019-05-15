import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Axios from "axios";
import {withRouter}from "react-router-dom"
import {updateUserInfo} from "../../redux/userInfoReducer"




class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropMenuOpen: false
        }
    }

    toggle = () => {
        this.setState({
            dropMenuOpen: !this.state.dropMenuOpen
        })
    }
    logout = async () => {
        Axios.post("/auth/logout")
        this.props.history.push("/")
        window.location.reload()
    }
    render() {
        let menu;
        let loggedInMenu;

        if (this.state.dropMenuOpen) {
            if (!this.props.first_name) {
                menu =
                    <div className="dropdown-menu">
                        <Link to="/login" className="menu-link">
                            <p onClick={this.toggle} >Login</p>
                        </Link>
                        <Link className="menu-link" to="/createaccount">
                            <p onClick={this.toggle}>Create An Account</p>
                        </Link>
                        <Link className="menu-link" to="/info/bank">
                            <p onClick={this.toggle}>Additional Information</p>
                        </Link>
                    </div>
            } else {
                if (!this.props.isadmin) {
                    loggedInMenu =
                        <div className="dropdown-menu">
                            <Link to="/info/account">
                                <p onClick={this.toggle} className="menu-link">Account Info</p>
                            </Link>
                            <Link to="/info/updateaccount">
                            <p onClick={this.toggle} className="menu-link">Update Info</p>
                            </Link>
                            <p className="menu-link">Apply For a Loan</p>
                        </div>
                } else {
                    loggedInMenu =
                        <div className="dropdown-menu">
                            <Link to="/info/account" className="menu-link">
                                <p onClick={this.toggle}>Account Info</p>
                            </Link>
                            <p>Apply For Loan</p>
                            <Link to="/teller/updateaccount" className="menu-link">
                            <p onClick={this.toggle}>Update Info</p>
                            </Link>
                            <p>Loan Requests</p>
                            <Link to="/teller/account">
                                <p onClick={this.toggle} className="menu-link">Teller</p>
                            </Link>
                        </div>
                }
            }
        }

        let typeOfMenu = (!this.state.dropMenuOpen) ? <i className="fas fa-bars" onClick={this.toggle} style={{fontSize: "1.25em"}}></i> : <i className="far fa-times-circle" style={{fontSize: "1.25em"}} onClick={this.toggle}></i>

        return (

            <div>
                <div className="header-with-dropdown">
                    <header>
                        <div className="logo">
                            <Link to="/" className="logo-to-home">
                                <i className="fas fa-landmark"></i>
                            </Link>
                        </div>
                        <div className="menu-container">
                        <div className="menu" >
                            {typeOfMenu}
                            <i className="fas fa-sign-out-alt" style={{fontSize: "1.25em"}} onClick={this.logout}></i>
                        </div>
                        </div>

                    </header>
                    <div className="dropdown-menu">
                        {menu}
                        {loggedInMenu}
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { first_name, isadmin } = state
    return { first_name, isadmin }
}
const mapDispatchToProps = {
    updateUserInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))