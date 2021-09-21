import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../actions/inboxActions"
import Message from "./Message"

const MessageContainer = ({ messages, updateChat, user, chat }) =>  {
    const [text, setText] = useState("")

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(sendMessage(user._id, chat, text, updateChat, messages, setText))
    }

    const otherUserId = chat?.users.find(id => id !== user._id)
    const otherName = users?.find(user => user._id === otherUserId)?.username

    useEffect(() => {
        const chatbox = document.querySelector(".messages-container")
        chatbox.scrollTop = chatbox.scrollHeight
    })

    return (
        <div className="messages-container">
            <div className="messages-heading">
                {otherName}
            </div>
            {
                messages ?
                (
                    messages.length ?
                    messages.map(message => <Message key={message._id} user={user} message={message}/>) :
                    <div className="empty-chats">
                        <p>Conversation has not started yet</p>
                        <p>Be the first the say something</p>
                    </div>

                ) : null
            }
            <form className="new-message" onSubmit={handleSubmit}>
                <input value={text} onChange={e => setText(e.target.value)}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default MessageContainer