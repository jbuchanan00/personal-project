import React, { Component } from "react"
import { Link } from "react-router-dom"


export default class Header extends Component {
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
    render() {
        let menu;
        if (this.state.dropMenuOpen) {

            menu =
                <div>
                    <Link to="/login">
                        <p>Login</p>
                    </Link>
                    <p>Create An Account</p>
                    <p>Additional Information</p>
                </div>
        }


        return (
            <div>

                <header>
                    <div className="logo">
                        <Link to="/">
                            <i className="fas fa-landmark"></i>
                        </Link>
                    </div>
                    <div className="menu" onClick={this.toggle}>
                        <i className="fas fa-bars"></i>
                    </div>

                </header>
                <div className="dropdown-menu">
                    {menu}
                </div>
            </div>
        )
    }
}

