const initialState = {
    user: false,
    errors: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case "AUTH":
            return {...state, user: action.data}
        case "ERROR":
            return {...state, errors: action.errors}
        default:
            return state
    }
}

export default authReducer