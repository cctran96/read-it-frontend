const initialState = {
    chats: null,
    chat: null,
    messages: null,
    messageError: null
}

const inboxReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHATS":
            return {...state, chats: action.chats}
        case "CHAT":
            return {...state, chat: action.chat}
        case "MESSAGES":
            return {...state, messages: action.messages}
        case "MSG_ERROR":
            return {...state, messageError: action.error}
        default:
            return state
    }
}

export default inboxReducer