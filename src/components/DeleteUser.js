import React, {Component} from "react"
import axios from "axios"



class DeleteAccount extends Component{
    constructor(props){
        super(props)
        this.state ={
            email: this.props.email
        }
    }

    deleteUser = async () => {
        let {email} = this.state
        console.log(email)
        await axios.delete(`/account/delete/${email}`)
    }
    render(){
        
        return(
            <div>
                <button onClick={this.deleteUser}>Delete User</button>
            </div>
        )
    }
}

export default DeleteAccount