import React, { useEffect, useState, useRef } from "react"
import "./styles.css"
import { useDispatch, useSelector } from "react-redux"
import { fetchChats, fetchMessages } from "../../actions/inboxActions"
import { BsPencil } from "react-icons/bs"
import { io } from "socket.io-client"
import Loading from "../Misc/Loading"
import Chat from "./Chat"
import Modal from "./Modal"
import Error from "../Misc/Error"
import MessageContainer from "./MessageContainer"

const Inbox = ({ user }) => {
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [arrivalMsg, setArrivalMsg] = useState(null)

    const socket = useRef()

    const dispatch = useDispatch()

    const inbox = useSelector(state => state.inbox)
    const chats = inbox.chats
    const activeChat = inbox.chat
    const messages = inbox.messages

    useEffect(() => {
        if (user) dispatch(fetchChats(user))
    }, [dispatch, user])

    useEffect(() => {
        if (activeChat) dispatch(fetchMessages(activeChat))
    }, [activeChat, dispatch])

    useEffect(() => {
        if (user) {
            socket.current.emit("addUser", user?._id)
            socket.current.on("getUsers", users => {
                
            })
        }
    }, [user])

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            console.log(data)
        })
    }, [])

    const updateChat = (receiverId, messageId) => {
        socket.current.emit("sendMessage", {
            receiverId,
            messageId
        })
    }

    const handleChange = e => setSearch(e.target.value)

    const handleShowModal = () => setShowModal(!showModal)

    return (
        <div className="page-container">
            {
                user ? 
                (
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
                        <MessageContainer messages={messages} updateChat={updateChat} user={user} chat={activeChat}/>
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