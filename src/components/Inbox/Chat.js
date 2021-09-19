import React from "react"

const Chat = ({ chat }) => {
    return (
        <div className="chat-card">
            <h1>{chat.title}</h1>
            <p>
                {
                    chat.lastMessage ?
                    `${chat.lastMessage.sender}: ${chat.lastMessage.body}` : 
                    "Conversation has not started yet"
                }
            </p>
            <p className="fade"></p>
        </div>
    )
} 

export default Chat