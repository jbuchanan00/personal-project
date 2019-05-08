let initialState = {
    first_name: "",
    last_name: "",
    email: "",
    account_number: "",
    phone_number: "",
    username: "",
    street: "",
    zip: "",
    state: "",
    isadmin: false

}

export default function userInfoReducer(state = initialState, action){
    switch(action.type){
        default:
            return state
    }
}