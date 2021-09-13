import React from "react"
import { motion } from "framer-motion"
import { logOutAccount } from "../actions/authActions"
import { useDispatch } from "react-redux"

const ProfileMenu = ({ user, collapse, showSearch, history, setShowProfile, handleLocationCheck }) => {
    const dispatch = useDispatch()

    const style = {
        borderRight: "none",
        borderRadius: "0 0 0 5px",
        bottom: "-200px",
        right: 0
    }
    
    const collapseStyle = {
        borderRadius: showSearch ? "5px" : "0 0 5px 5px",
        bottom: showSearch ? "-250px" : "-200px",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
    }

    const logout = () => {
        dispatch(logOutAccount(history))
        setShowProfile(false)
    }

    const handleNewPost = () => {
        handleLocationCheck("/submit")
        setShowProfile(false)
    }

    const handleNewCommunity = () => {
        handleLocationCheck("/community")
        setShowProfile(false)
    }

    const handleViewProfile = () => {
        handleLocationCheck(`/u/${user.username}`)
        setShowProfile(false)
    }

    return (
        <motion.div 
            initial="start"
            animate="end"
            variants={menuVar}
            className="profile-menu" 
            style={collapse ? collapseStyle : style}
        >
            <p onClick={handleViewProfile}>Profile</p>
            <p onClick={handleNewPost}>Create Post</p>
            <p>New Community</p>
            <p>Settings</p>
            <p style={{border: "none"}} onClick={logout}>Logout</p>
        </motion.div>
    )
}

export default ProfileMenu

const menuVar = {
    start: {y: -10, opacity: 0},
    end: {y: 0, opacity: 1, transition: {duration: 0.2}}
}