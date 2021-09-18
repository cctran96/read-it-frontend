import React, { useState } from "react"
import { motion } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { createChat } from "../../actions/inboxActions"

const Modal = ({ user, handleShowModal, chats }) => {
    const [username, setUsername] = useState("")
    const [error, setErrors] = useState(false)

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    const handleSubmit = e => {
        e.preventDefault()
        const foundUser = users.find(user => user.username === username)

        if (foundUser && username !== user.username) {
            const body = {
                title: `${user.username} & ${foundUser.username}`,
                users: [user._id, foundUser._id]
            }

            dispatch(createChat(chats, body))

            handleShowModal(false)
        } else if (username === user.username) setErrors("Cannot chat with yourself")
        else setErrors("User not found")
    }

    const handleChange = e => {
        setUsername(e.target.value)
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
                    value={username} 
                    placeholder="Find user" 
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