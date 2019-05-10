import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"




class Header extends Component {
    constructor() {
        super()
        this.state = {
            dropMenuOpen: false
        }
    }

    toggle = () => {
        this.setState({
            dropMenuOpen: !this.state.dropMenuOpen
        })
    }
    render() {
        let menu;
        let loggedInMenu;

        if (!this.state.dropMenuOpen) {
            if (!this.props.first_name) {
                menu =
                    <div className="dropdown-menu">
                        <Link to="/login" className="menu-link" >
                            <p onClick={this.toggle}>Login</p>
                        </Link>
                        <Link className="menu-link" to="/createaccount">
                            <p onClick={this.toggle}>Create An Account</p>
                        </Link>
                        <Link className="menu-link">
                            <p onClick={this.toggle}>Additional Information</p>
                        </Link>
                    </div>
            } else {
                if (!this.props.isadmin) {
                    loggedInMenu =
                        <div className="dropdown-menu">
                            <Link to="/info/account">
                                <p onClick={this.toggle}>Account Info</p>
                            </Link>
                            <p>Apply For Loan</p>
                            <p>Update Info</p>
                        </div>
                } else {
                    loggedInMenu =
                        <div className="dropdown-menu">
                            <Link to="/info/account" className="menu-link">
                                <p onClick={this.toggle}>Account Info</p>
                            </Link>
                            <p>Apply For Loan</p>
                            <p>Update Info</p>
                            <p>Loan Requests</p>
                            <Link to="/teller/account" className="menu-link">
                                <p onClick={this.toggle}>Teller</p>
                            </Link>
                        </div>
                }
            }
        }



        return (

            <div>
                <div className="header-with-dropdown">
                    <header>
                        <div className="logo">
                            <Link to="/" className="logo-to-home">
                                <i className="fas fa-landmark"></i>
                            </Link>
                        </div>
                        <div className="menu" onClick={this.toggle}>
                            <i className="fas fa-bars"></i>
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

export default connect(mapStateToProps)(Header)