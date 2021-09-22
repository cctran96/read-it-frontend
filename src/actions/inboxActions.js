const chatURL = "http://localhost:5000/chats/"
const msgURL = "http://localhost:5000/messages/"
const token = localStorage.getItem("token")

export const fetchChats = (user) => {
    const config = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    }

    return dispatch => {
        fetch(chatURL + user._id, config)
        .then(res => res.json())
        .then(chats => {
            dispatch({ type: "CHATS", chats})
            if (chats.length) dispatch({ type: "CHAT", chat: chats[0] })
        })
        .catch(err => console.log(err))
    }
}

export const createChat = (oldChats, body) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }

    return dispatch => {
        fetch(chatURL, config)
        .then(res => res.json())
        .then(data => {
            const chats = [...oldChats, data]
            dispatch({ type: "CHATS", chats})
        })
        .catch(err => console.log(err))
    }
}

export const setActiveChat = chat => {
    return dispatch => {
        dispatch({ type: "CHAT", chat })
    }
}

export const fetchMessages = chat => {
    const config = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    }

    return dispatch => {
        fetch(msgURL + chat._id, config)
        .then(res => res.json())
        .then(messages => {
            dispatch({ type: "MESSAGES", messages })
        })
        .catch(err => console.log(err))
    }
}

export const sendMessage = (userId, chat, text, updateChat, oldMessages, setText) => {
    const body = {
        text: text,
        sender: userId,
        chat: chat._id
    }

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }

    return dispatch => {
        fetch(msgURL, config)
        .then(res => res.json())
        .then(message => {
            if (message.error) {
                const error = message.error
                dispatch({ type: "MSG_ERROR", error })
            } else {
                const messages = [...oldMessages, message]
                const receiverId = chat.users.find(id => id !== userId)

                updateChat(receiverId, message)

                dispatch({ type: "MESSAGES", messages })

                setText("")
            }
        })
        .catch(err => console.log(err))
    }
}