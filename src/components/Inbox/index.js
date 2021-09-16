import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./styles.css"
import Loading from "../Misc/Loading"
import { fetchChats, fetchMessages } from "../../actions/inboxActions"

const Inbox = ({ user }) => {
    const dispatch = useDispatch()

    const inbox = useSelector(state => state.inbox)
    const chats = inbox.chats
    const messages = inbox.messages

    useEffect(() => {
        if (user) dispatch(fetchChats(user))
    }, [dispatch, user])

    return (
        <div className="inbox-container">
            {
                chats === null ?
                <Loading/> :
                <>
                    <div className="chats-container">

                    </div>
                    <div className="messages-container">

                    </div>
                </>
            }
        </div>
    )
}

export default Inbox