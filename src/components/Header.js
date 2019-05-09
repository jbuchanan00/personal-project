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
                <div className="dropdown-menu">
                    <Link to="/login" className="menu-link" >
                        <p onClick={this.toggle}>Login</p>
                    </Link>
                    <Link className="menu-link">
                        <p onClick={this.toggle}>Create An Account</p>
                    </Link>
                    <Link className="menu-link">
                        <p onClick={this.toggle}>Additional Information</p>
                    </Link>
                </div>
        }


        return (
            <div>

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
                </div>
            </div>
        )
    }
}

