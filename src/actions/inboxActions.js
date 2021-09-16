const chatURL = "http://localhost:5000/chats/"
const msgURL = "http://localhost:5000/messages/"

export const fetchChats = (user) => {
    const token = localStorage.getItem("token")

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
            dispatch({ type: "CHATS", chats})
        })
    }
}

export const fetchMessages = (id) => {
    return dispatch => {
        fetch(msgURL + id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
}