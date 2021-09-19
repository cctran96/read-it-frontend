import React, { useEffect, useState } from "react"
import "./styles.css"
import { useDispatch, useSelector } from "react-redux"
import { fetchChats, fetchMessages } from "../../actions/inboxActions"
import { BsPencil } from "react-icons/bs"
import Loading from "../Misc/Loading"
import Chat from "./Chat"
import Message from "./Message"
import Modal from "./Modal"
import Error from "../Misc/Error"

const Inbox = ({ user }) => {
    const [search, setSearch] = useState("")
    const [filteredChats, setFilteredChats] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState(null)
    

    const dispatch = useDispatch()

    const inbox = useSelector(state => state.inbox)
    const chats = inbox.chats
    const messages = inbox.messages

    useEffect(() => {
        if (user) {
            dispatch(fetchChats(user))
            setFilteredChats(chats)
        }
    }, [dispatch, user, chats])

    const handleChange = e => setSearch(e.target.value)

    const handleShowModal = () => setShowModal(!showModal)

    return (
        <div className="page-container">
            {
                user ? 
                (
                    chats === null ?
                    <Loading/> :
                    <>
                        <div className="inbox-container">
                            <div className="chats-header">
                                <input onChange={handleChange} value={search} placeholder="Find Chat"/>
                                <BsPencil onClick={handleShowModal}/>
                            </div>
                            <div className="chats-container">
                                { showModal ? <Modal user={user} handleShowModal={handleShowModal} chats={chats}/> : null }
                                {
                                    filteredChats == null ? 
                                    <Loading/> :
                                    (
                                        filteredChats?.length ?
                                        filteredChats.map(chat => <Chat key={chat._id} chat={chat}/>) :
                                        <div className="empty-chats">
                                            <p>No chats yet.</p>
                                            <p>Start a conversation!</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="messages-container">

                        </div>
                    </>
                ) : 
                (
                    user === null ? <Loading/> : <Error message="You are not logged in"/>
                )
            }
        </div>
    )
}

export default Inbox