const initialState = {
    communities: []
}

const communityReducer = (state = initialState, action) => {
    switch(action.type) {
        case "COMMUNITY": 
            return {...state, posts: action.community}
        default:
            return state;
    }
}

export default communityReducer;