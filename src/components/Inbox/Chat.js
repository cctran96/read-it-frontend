import React from "react"

const Chat = ({ chat }) => {
    return (
        <div className="chat-card">
            <h1>{chat.title}</h1>
        </div>
    )
} 

export default Chat