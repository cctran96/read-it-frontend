import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./styles.css"
import Loading from "../Misc/Loading"

const url = "http://localhost:5000/chat/"

const Inbox = ({ user }) => {
    const inbox = useSelector(state => state.inbox)
    const chats = inbox.chats
    const messages = inbox.messages

    useEffect(() => {
        
    }, [user])

    return (
        <div className="inbox-container">
            {
                chats === null || messages === null ?
                <Loading/> :
                <>
                </>
            }
        </div>
    )
}

export default Inbox