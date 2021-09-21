import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { sendMessage } from "../../actions/inboxActions"
import Message from "./Message"

const MessageContainer = ({ messages, updateChat, user, chat }) =>  {
    const [text, setText] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(sendMessage(user._id, chat, text, updateChat, messages, setText))
    }

    return (
        <div className="messages-container">
            {
                messages ?
                (
                    messages.length ?
                    messages.map(message => <Message key={message._id} message={message}/>) :
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