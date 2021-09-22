import React from "react"

const Message = ({ user, message }) => {
    const fromMe = user._id === message.sender

    return (
        <div className="message-container">
            <p className={fromMe ? "me" : "them"}>{message.text}</p>
        </div>
    )
}

export default Message