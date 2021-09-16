const initialState = {
    communities: [],
    community: null,
    error: null
}

const communityReducer = (state = initialState, action) => {
    switch(action.type) {
        case "COMMUNITIES": 
            return {...state, communities: action.communities}
        case "COMMUNITY":
            return {...state, community: action.community}
        case "COMMUNITYERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
}

export default communityReducer;