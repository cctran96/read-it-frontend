import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setActiveChat } from "../../actions/inboxActions"

const Chat = ({ chat }) => {
    const dispatch = useDispatch()
    const active = useSelector(state => state.inbox.chat)

    let match = chat?._id === active?._id

    const handleClick = () => {
        dispatch(setActiveChat(chat))
    }

    return (
        <div 
            className={`chat-card ${match ? "active" : null}`}
            onClick={handleClick}
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