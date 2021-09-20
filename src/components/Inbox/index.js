import React, { useEffect, useState, useRef } from "react"
import "./styles.css"
import { useDispatch, useSelector } from "react-redux"
import { fetchChats, fetchMessages } from "../../actions/inboxActions"
import { BsPencil } from "react-icons/bs"
import { io } from "socket.io-client"
import Loading from "../Misc/Loading"
import Chat from "./Chat"
import Message from "./Message"
import Modal from "./Modal"
import Error from "../Misc/Error"

const Inbox = () => {
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [arrivalMsg, setArrivalMsg] = useState(null)

    const socket = useRef()

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const inbox = useSelector(state => state.inbox)
    const chats = inbox.chats
    const activeChat = inbox.chat
    const messages = inbox.messages

    useEffect(() => {
        if (user) dispatch(fetchChats(user))
    }, [dispatch, user])

    useEffect(() => {
        if (activeChat) dispatch(fetchMessages(activeChat))
    }, [activeChat])

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    const updateChat = message => {
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: activeChat.find(),
            text: message
        })
    }

    useEffect(() => {
        if (user) {
            socket.current.emit("addUser", user?._id)
            socket.current.on("getUsers", users => {
                console.log(users)
            })
        }
    }, [user])

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
                                    chats == null ? 
                                    <Loading/> :
                                    (
                                        chats?.length ?
                                        chats.map(chat => <Chat key={chat._id} chat={chat}/>) :
                                        <div className="empty-chats">
                                            <p>No chats yet.</p>
                                            <p>Start a conversation!</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="messages-container">
                            {
                                messages?.length ?
                                messages.map(message => <Message key={message._id} message={message} updateChat={updateChat}/>) :
                                <div className="empty-chats">
                                    <p>Conversation has not started yet</p>
                                    <p>Be the first the say something</p>
                                </div>
                            }
                            <form className="new-message">
                                <input />
                                <button type="submit"></button>
                            </form>
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