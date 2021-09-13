import React, { useEffect, useState } from "react"
import "./styles.css"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Error from "../Misc/Error"
import Loading from "../Misc/Loading"
import Post from "./Post"

const url = "http://localhost:5000/posts/user/"

const Profile = () => {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState(null)
    const [sortBy, setSortBy] = useState("recent")

    const users = useSelector(state => state.users.users)
    const path = useLocation().pathname.slice(3)

    useEffect(() => { 
        if (users.length) {
            let foundUser = users.find(u => u.username === path)

            if (foundUser) {
                fetch(url + foundUser.username)
                .then(res => res.json())
                .then(data => {
                    setPosts(data)
                })
            }

            setUser(foundUser)
        }
    }, [users, path])

    const handleSortType = e => {
        setSortBy(e.target.getAttribute("name"))
    }

    const activeStyle = text => (
        sortBy === text ?
        {
            border: "2px solid black",
            backgroundColor: "#e7e2e2"
        } :
        {
            border: "1px solid black"
        }
    )

    return (
        <div className="profile-container">
            {   
                user ? 
                <>
                    <div className="profile-info">
                        <h1>{user.username}</h1>
                    </div>
                    <div className="user-posts-container">
                        <div className="sort-bar">
                            <p
                                onClick={handleSortType} 
                                name="recent"
                                style={activeStyle("recent")}
                            >
                                Most Recent
                            </p>
                            <p
                                onClick={handleSortType}
                                name="popular"
                                style={activeStyle("popular")}
                            >
                                Most Popular
                            </p>
                            <p 
                                onClick={handleSortType} 
                                name="comment"
                                style={activeStyle("comment")}
                            >
                                Comments
                            </p>
                        </div>
                        <div className="user-posts">
                            {
                                posts?.length ?
                                posts.map(post => {
                                    return (
                                        <Post key={post._id} post={post}/>
                                    )
                                }) : 
                                (
                                    posts === null ? null : 
                                    <h1 style={{marginTop: "auto", marginBottom: "auto"}}>No posts yet!</h1>
                                )
                            }
                        </div>
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