import {Switch, Route} from "react-router-dom"
import React from "react"
import GetUserDetails from "../components/GetUserDetails"
import LoginForm from "../components/LoginForm"
import AccountView from "../components/AccountView"


export default(
    <Switch>
        <Route exact path="/" component={GetUserDetails} />
        <Route path="/login" component={LoginForm} />
        <Route path="/info/account" component={AccountView} />
    </Switch>
)