import {combineReducers, createStore} from "redux"
import userInfoReducer from "./userInfoReducer"
import loanAppReducer from "./loanAppReducer"


const rootReducer =  combineReducers({
    userInfoReducer,
    loanAppReducer
})

export default createStore(rootReducer)