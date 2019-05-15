import React, {Component} from "react"
import axios from "axios"



class DeleteAccount extends Component{
    constructor(props){
        super(props)
        this.state ={
            email: this.props.email,
            account_number: this.props.account_number,
            deleteAccount: false
        }
    }

    deleteUser = async () => {
        if(!this.state.deleteAccount){
            return
        }
        let {email, account_number} = this.state
        let res = await axios.delete(`/account/delete/${email}/${account_number}`)
        this.setState({
            deleteAccount: false
        })
        alert(res.data)
    }
    confirmDelete = () => {
        if(this.state.deleteAccount){
            return
        }
        this.setState({
            deleteAccount: true
        })
    }
    cancelDelete = () => {
        this.setState({
            deleteAccount: false
        })
    }

    render(){
        let confirmedDelete = (this.state.deleteAccount) ? <div>
            <h2>Do you want to delete account {this.state.account_number}</h2>
            <button onClick={this.deleteUser}>Yes, I want to delete.</button>
            <button onClick={this.cancelDelete}>Nevermind</button>
        </div> : null
        return(
            <div>
                <button onClick={this.confirmDelete} className="delete-user-button">Delete User</button>
                {confirmedDelete}
            </div>
        )
    }
}

export default DeleteAccount