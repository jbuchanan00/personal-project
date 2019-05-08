import {Switch, Route} from "react-router-dom"
import React from "react"
import GetUserDetails from "../components/GetUserDetails"
import LoginForm from "../components/LoginForm"


export default(
    <Switch>
        <Route exact path="/" component={GetUserDetails} />
        <Route path="/login" component={LoginForm} />
    </Switch>
)