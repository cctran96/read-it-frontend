import React from "react"
import "./styles.css"
import { useSelector } from "react-redux"

const Profile = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <div className="profile-container">
            <div className="profile-info">
                <h1>{user.username}</h1>
            </div>
        </div>
    )
}

export default Profile