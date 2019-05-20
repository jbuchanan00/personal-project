let initialState = {
    first_name: "",
    last_name: "",
    email: "",
    account_number: "",
    phone_number: "",
    username: "",
    street: "",
    zip: "",
    _state: "",
    isadmin: false

}

export const UPDATE_USER_INFORMATION = "UPDATE_USER_INFORMATION"



export function updateUserInfo(obj){
    return{
        type: UPDATE_USER_INFORMATION,
        payload: obj
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER_INFORMATION:
            let {first_name, last_name, email, account_number, phone_number, username, street, zip, _state, isadmin, city} = action.payload
            return {
                ...state,
                first_name,
                last_name,
                email,
                account_number,
                phone_number,
                username,
                _state,
                street,
                zip,
                isadmin,
                city
            }
        default:
            return state
    }
}

