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
            <div>
                {this.state.data.map(data => {
                    return <h3 key={data.id}>{data.first_name} {data.last_name}</h3>
                })}
            </div>
        )
    }
}