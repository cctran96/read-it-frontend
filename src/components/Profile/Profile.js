import React, { useEffect, useState } from "react"
import "./styles.css"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Error from "../Misc/Error"
import Loading from "../Misc/Loading"

const Profile = () => {
    const [user, setUser] = useState(null)

    const users = useSelector(state => state.users.users)
    const path = useLocation().pathname.slice(6)

    useEffect(() => { 
        if (users.length) setUser(users.find(u => u.username === path))
    }, [users, path])

    return (
        <div className="profile-container">
            {   
                user ? 
                <>
                    <div className="profile-info">
                        <h1>{user.username}</h1>
                    </div>
                </> :
                (
                    user === null ? <Loading/> : <Error/>
                )
            }
        </div>
    )
}

export default Profile