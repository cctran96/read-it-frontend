const chatURL = "http://localhost:5000/chats/"
const msgURL = "http://localhost:5000/messages/"
const token = localStorage.getItem("token")

export const fetchChats = (user) => {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return dispatch => {
        fetch(chatURL + user._id, config)
        .then(res => res.json())
        .then(chats => {
            console.log("hi")
            dispatch({ type: "CHATS", chats})
            if (chats.length) dispatch({ type: "CHAT", chat: chats[0] })
        })
    }
}

export const createChat = (oldChats, body) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
    }
}

export const setActiveChat = chat => {
    return dispatch => {
        dispatch({ type: "CHAT", chat })
    }
}

export const fetchMessages = chat => {
    return dispatch => {
        fetch(msgURL + chat._id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
}