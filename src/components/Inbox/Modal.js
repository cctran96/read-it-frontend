import React, { useState } from "react"
import { motion } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { createChat } from "../../actions/inboxActions"

const Modal = ({ user, handleShowModal, chats }) => {
    const [fields, setFields] = useState({ username: "", message: "" })
    const [error, setErrors] = useState(false)

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    const handleSubmit = e => {
        e.preventDefault()

        const username = fields.username

        const foundUser = users.find(user => user.username === username)
        
        if (foundUser && username !== user.username) {
            const body = {
                title: `${user.username} & ${foundUser.username}`,
                users: [user._id, foundUser._id],
                message: {
                    text: fields.message,
                    sender: user._id
                }
            }

            dispatch(createChat(chats, body))

            handleShowModal(false)
        } else if (username === user.username) setErrors("Cannot chat with yourself")
        else setErrors("User not found")
    }

    const handleChange = e => {
        setFields({...fields, [e.target.name]: e.target.value})
    }

    return (
        <motion.div 
            className="chat-modal"
            initial="start" 
            animate="end" 
            variants={modalVar}
        >
            <AiOutlineClose size={25} onClick={handleShowModal}/>
            <p>{error ? error : null}</p>
            <form onSubmit={handleSubmit}>
                <input
                    className={error ? "error" : null}
                    onChange={handleChange}
                    name="username"
                    value={fields.username} 
                    placeholder="Find user" 
                    required
                />
                <textarea 
                    onChange={handleChange}
                    name="message" 
                    value={fields.message} 
                    placeholder="What's on your mind?" 
                    required
                />
                <button type="submit">Create Chat</button>
            </form>
        </motion.div>
    )
}

export default Modal

const modalVar = {
    start: {
        y: -10,
        opacity: 0
    },
    end: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "linear"
        }
    }
}