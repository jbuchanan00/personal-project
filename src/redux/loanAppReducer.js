const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    city: "",
    _state: "",
    zip: "",
    street: "",
    type_of_loan: "",
    amount: 0,
    term_length: 0,
    employer: "",
    work_title: "",
    income: 0,
    ssn: "",
    account_number: ""
}

export function updatePersonal(obj){
    return{
        type: UPDATE_USER_INFO_LOAN,
        payload: obj
    }
}
export function updateEmployment(obj){
    return{
        type: UPDATE_USER_EMPLOYMENT,
        payload: obj
    }
}
export function updateRequest(obj){
    return{
        type: UPDATE_USER_REQUEST,
        payload: obj
    }
}


export const UPDATE_USER_INFO_LOAN = "UPDATE_USER_INFO_LOAN"
export const UPDATE_USER_EMPLOYMENT = "UPDATE_USER_EMPLOYMENT"
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST"


function loanReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER_INFO_LOAN:
            let {first_name, last_name, email, account_number, phone_number, street, zip, _state, city, ssn} = action.payload
            return{
                ...state, first_name, last_name, email, account_number, phone_number, _state, zip, city, street, ssn
            }
        case UPDATE_USER_EMPLOYMENT:
            let {employer, work_title, income} = action.payload
            return{
                ...state, employer, work_title, income
            }
        case UPDATE_USER_REQUEST:
            let {type_of_loan, amount, term_length} = action.payload
            return{
                ...state, type_of_loan, amount, term_length
            }
            
        default:
            return state
    }
}

export default loanReducer