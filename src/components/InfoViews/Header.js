import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Axios from "axios";
import { withRouter } from "react-router-dom"
import { updateUserInfo } from "../../redux/userInfoReducer"




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



        let menu = (this.state.dropMenuOpen) ?
            (!this.props.first_name) ?
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
                :
                (!this.props.isadmin) ?

                    <div className="dropdown-menu" >
                        <Link to="/info/account" className="menu-link">
                            <p onClick={this.toggle} >Account Info</p>
                        </Link>
                        <Link to="/info/updateaccount" className="menu-link">
                            <p onClick={this.toggle} >Update Info</p>
                        </Link>
                        <Link className="menu-link" to="/apply/1">
                        <p onClick={this.toggle}>Apply For a Loan</p>
                        </Link>
                    </div>
                    :

                    <div className="dropdown-menu">
                        <Link to="/info/account" className="menu-link">
                            <p onClick={this.toggle}>Account Info</p>
                        </Link>
                        <Link to="/teller/updateaccount" className="menu-link">
                            <p onClick={this.toggle}>Update Info</p>
                        </Link>
                        <p>Loan Requests</p>
                        <Link to="/teller/account" className="menu-link">
                            <p onClick={this.toggle} >Teller</p>
                        </Link>
                    </div>
            : null


        let menuDesktop =
            (!this.props.first_name) ?

                <div className="hidden-menu-desktop">
                    <Link to="/login" className="menu-link">
                        <p onClick={this.toggle} >Login</p>
                    </Link>
                    <Link className="menu-link" to="/createaccount">
                        <p onClick={this.toggle}>Create An Account</p>
                    </Link>
                    <Link className="menu-link" to="/info/bank">
                        <p onClick={this.toggle}>Additional Information</p>
                    </Link>
                    <div className="logout-icon-desktop">
                            <i className="fas fa-sign-out-alt" style={{ fontSize: "2em" }} onClick={this.logout}></i>
                        </div>
                </div>
                :
                (!this.props.isadmin) ?

                    <div className="hidden-menu-desktop">
                        <Link to="/info/account"className="menu-link">
                            <p onClick={this.toggle}>Account Info</p>
                        </Link>
                        <Link to="/info/updateaccount" className="menu-link">
                            <p onClick={this.toggle} >Update Info</p>
                        </Link>
                        <Link className="menu-link" to="/apply/1">
                        <p className="menu-link">Apply For a Loan</p>
                        </Link>
                        <div className="logout-icon-desktop">
                            <i className="fas fa-sign-out-alt" style={{ fontSize: "2em" }} onClick={this.logout}></i>
                        </div>
                    </div>
                    :

                    <div className="hidden-menu-desktop">
                        <Link to="/info/account" className="menu-link">
                            <p onClick={this.toggle}>Account Info</p>
                        </Link>
                        <Link to="/teller/updateaccount" className="menu-link">
                            <p onClick={this.toggle}>Update Info</p>
                        </Link>
                        <Link to="" className="menu-link">
                        <p>Loan Requests</p>
                        </Link>
                        <Link to="/teller/account" className="menu-link">
                            <p onClick={this.toggle} >Teller</p>
                        </Link>
                        <div className="logout-icon-desktop">
                            <i className="fas fa-sign-out-alt" style={{ fontSize: "2em" }} onClick={this.logout}></i>
                        </div>

                    </div>



        let typeOfMenu = (!this.state.dropMenuOpen) ? <i className="fas fa-bars" onClick={this.toggle} style={{ fontSize: "1.25em" }}></i> : <i className="far fa-times-circle" style={{ fontSize: "1.25em" }} onClick={this.toggle}></i>

        return (

            <div>
                <div className="header-with-dropdown">
                    <header>
                        <div className="logo">
                            <Link to="/" className="logo-to-home">
                                <i className="fas fa-landmark"></i>
                            </Link>
                        </div>
                        <div className="bank-name">La Banque</div>
                        <div className="menu-container">
                            <div className="menu" >
                                {typeOfMenu}
                                <i className="fas fa-sign-out-alt" style={{ fontSize: "1.25em" }} onClick={this.logout}></i>
                            </div>
                        </div>
                        <div className="desktop-menu-container">
                            {menuDesktop}
                        </div>

                    </header>
                    <div className="dropdown-menu">
                        {menu}


                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let { first_name, isadmin } = state.userInfoReducer
    return { first_name, isadmin }
}



export default connect(mapStateToProps,{updateUserInfo})(withRouter(Header))