const initialState = {
    communities: [],
    community: null
}

const communityReducer = (state = initialState, action) => {
    switch(action.type) {
        case "COMMUNITIES": 
            return {...state, communities: action.communities}
        case "COMMUNITY":
            return {...state, community: action.community}
        default:
            return state;
    }
}

export default communityReducer;