import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { ImArrowUp, ImArrowDown } from "react-icons/im"
import Loading from "../Misc/Loading"
import Error from "../Misc/Error"

const url = "http://localhost:5000/posts/"

const Post = () => {
    const history = useHistory()
    const location = useLocation()
    const path = location.pathname.slice(3)

    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(url + path)
        .then(res => res.json())
        .then(data => {
            setPost(data.message ? undefined : data)
        })
    }, [])

    const handleLocationCheck = loc => {
        if (location.pathname !== loc) history.push(loc)
    }

    return (
        <div className="post-page-container">
            {
                post ?
                <div className="post-container">
                    <div className="post-content-container">
                        <div className="vote-container">
                            <ImArrowUp/>
                            <ImArrowDown/>
                        </div>
                        <div className="post-content">
                            <p>
                                r/{post.community} • Posted by
                                <b onClick={() => handleLocationCheck(`/u/${post.creator}`)}> {post.creator}</b>
                            </p>
                            <h1>{post.title}</h1>
                            <p style={{fontSize: "15px"}}>{post.context}</p>
                        </div>
                    </div>
                    <div className="post-comment-container">

                    </div>
                </div> :
                (
                    post === null ? <Loading/> : <Error/>
                )
            }
        </div>
    )
}

export default Post