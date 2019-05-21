import {Switch, Route} from "react-router-dom"
import React from "react"
import GetUserDetails from "./InfoViews/Home"
import LoginForm from "../components/Forms/LoginForm"
import AccountView from "../components/AccountView/AccountView"
import CreateAccount from "../components/Forms/CreateAccount"
import NewAccountInfo from "../components/InfoViews/NewAccountInfo"
import TellerView from "../components/AccountView/TellerView"
import UpdateUserInfo from "../components/Forms/UpdateUserInfo"
import UpdateUserInfoAdmin from "./Forms/UpdateUserInfoAdmin";
import AFLPersonalInfo from "./applyingforloan/AFLPersonalInfo"
import AFLRequest from "./applyingforloan/AFLRequest"
import AFLEmploymentInfo from "./applyingforloan/AFLEmploymentInfo"
import ApplyForLoan from "./applyingforloan/ApplyForLoan"




export default(
    <Switch>
        <Route exact path="/" component={GetUserDetails} />
        <Route path="/login" component={LoginForm} />
        <Route path="/info/account" component={AccountView} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/info/newaccount" component={NewAccountInfo} />
        <Route path="/teller/account" component={TellerView} />
        <Route path="/info/updateaccount" component={UpdateUserInfo} />
        <Route path="/apply/1" component={AFLPersonalInfo}/>
        <Route path="/teller/updateaccount" component={UpdateUserInfoAdmin} />
        <Route path="/apply/2" component={AFLEmploymentInfo} />
        <Route path="/apply/3" component={AFLRequest} />
        <Route path="/apply/submitted" component={ApplyForLoan} />
    </Switch>
)