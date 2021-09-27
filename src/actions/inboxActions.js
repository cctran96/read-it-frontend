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

    console.log(body)

    return dispatch => {
        fetch(chatURL, config)
        .then(res => res.json())
        .then(chat => {
            const chats = [...oldChats, chat]

            dispatch({ type: "CHATS", chats })
            dispatch({ type: "CHAT", chat })
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

export const sendMessage = (userId, chat, text, updateChat, oldMessages, setText, oldChats) => {
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
        .then(data => {
            if (data.error) {
                const error = data.error
                dispatch({ type: "MSG_ERROR", error })
            } else {
                const message = data.message
                const messages = [...oldMessages, message]
                const receiverId = chat.users.find(id => id !== userId)

                const chats = [...oldChats].map(chat => chat._id === message.chat ? data.chat : chat)
                
                updateChat(receiverId, message, data.chat)

                dispatch({ type: "MESSAGES", messages })
                dispatch({ type: "CHATS", chats })

                setText("")
            }
        })
        .catch(err => console.log(err))
    }
}