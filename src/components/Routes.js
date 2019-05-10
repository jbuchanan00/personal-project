import {Switch, Route} from "react-router-dom"
import React from "react"
import GetUserDetails from "./InfoViews/Home"
import LoginForm from "../components/Forms/LoginForm"
import AccountView from "../components/AccountView/AccountView"
import CreateAccount from "../components/Forms/CreateAccount"
import NewAccountInfo from "../components/InfoViews/NewAccountInfo"
import TellerView from "../components/AccountView/TellerView"



export default(
    <Switch>
        <Route exact path="/" component={GetUserDetails} />
        <Route path="/login" component={LoginForm} />
        <Route path="/info/account" component={AccountView} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/info/newaccount" component={NewAccountInfo} />
        <Route path="/teller/account" component={TellerView} />
    </Switch>
)