import React, {Component} from "react"
import axios from "axios"


export default class UserDetails extends Component{
    constructor(){
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        
    }

    

    render(){
        
        return(
            <div className="home-body">
                <h1>La Banque</h1>
                <div className="home-container">
                <img src="http://www.assignmentpoint.com/wp-content/uploads/2013/11/Bank1.jpg" alt="bank pic" className="bank-image" />
                <p className="home-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="home-container">
                    <img src="https://images.pexels.com/photos/164652/pexels-photo-164652.jpeg?cs=srgb&dl=banknotes-cash-deal-164652.jpg&fm=jpg" alt="money" className="money-image" />
                <h4>Free Money Giveaway!</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        )
    }
}