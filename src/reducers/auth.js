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
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}

export default authReducer