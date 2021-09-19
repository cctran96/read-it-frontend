import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Chat = ({ chat }) => {
    const [match, setMatch] = useState(null)
    const active = useSelector(state => state.inbox.chat)

    useEffect(() => {
        if (chat?._id === active?._id) setMatch(true)
    }, [active])

    return (
        <div 
            className={`chat-card ${match ? "active" : null}`}
        >
            <h1>{chat.title}</h1>
            <p>
                {
                    chat.lastMessage ?
                    `${chat.lastMessage.sender}: ${chat.lastMessage.body}` : 
                    "Conversation has not started yet"
                }
            </p>
            <p 
                className="fade"
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, ${match ? "black" : "white"})`
                }}
            ></p>
        </div>
    )
} 

export default Chat