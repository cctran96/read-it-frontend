import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setActiveChat } from "../../actions/inboxActions"

const Chat = ({ chat }) => {
    const dispatch = useDispatch()
    const active = useSelector(state => state.inbox.chat)
    const users = useSelector(state => state.users.users)
    const user = chat.lastMessage ? users.find(user => user._id === chat.lastMessage.sender).username : null

    let match = chat?._id === active?._id

    const handleClick = () => {
        dispatch(setActiveChat(chat))
    }

    const handleKeyDown = e => {
        if (e.key === "Enter") dispatch(setActiveChat(chat))
    }

    return (
        <div 
            className={`chat-card ${match ? "active" : null}`}
            tabIndex="0"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <h1>{chat.title}</h1>
            <p>
                {
                    chat.lastMessage ?
                    `${user}: ${chat.lastMessage.text}` : 
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