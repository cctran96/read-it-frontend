const initialState = {
    user: null,
    errors: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case "AUTH":
            return {...state, user: action.user}
        case "ERROR":
            return {...state, errors: action.errors}
        case "USER_LOAD":
            return {...state, user: null}
        case "LOGOUT":
            return {...state, user: false}
        default:
            return state
    }
}

export default authReducer