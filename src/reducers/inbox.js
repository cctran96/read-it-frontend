const initialState = {
    chats: null,
    chat: null,
    messages: null
}

const inboxReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHATS":
            return {...state, chats: action.chats}
        case "CHAT":
            return {...state, chat: action.chat}
        case "MESSAGES":
            return {...state, messages: action.messages}
        default:
            return state
    }
}

export default inboxReducer