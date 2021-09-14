import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti"
import Loading from "../Misc/Loading"
import Error from "../Misc/Error"
import Comment from "./Comment"

const url = "http://localhost:5000/posts/"

const Post = ({ user }) => {
    const history = useHistory()
    const location = useLocation()
    const path = location.pathname.slice(3)

    const [post, setPost] = useState(null)
    const [newComment, setComment] = useState("")
    const [sortBy, setSortBy] = useState("Hot")
    const [comments, setComments] = useState(null)

    useEffect(() => {
        fetch(url + path)
        .then(res => res.json())
        .then(data => {
            setPost(data.message ? undefined : data)
            setComments(data.comments)
        })
    }, [path])

    const handleLocationCheck = loc => {
        if (location.pathname !== loc) history.push(loc)
    }

    const handleChange = e => {
        setComment(e.target.value)
    }

    const handleSortType = e => {
        setSortBy(e.target.value)
    }

    return (
        <div className="post-page-container">
            {
                post ?
                <div className="post-container">
                    <div className="post-content-container">
                        <div className="vote-container">
                            <TiArrowUpOutline/>
                            <TiArrowDownOutline/>
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
                        {
                            user ? 
                            <form className="comment-form">
                                <p>
                                    Commenting as
                                    <b onClick={() => handleLocationCheck(`/u/${user.username}`)}> {user.username}</b>
                                </p>
                                <textarea 
                                    onChange={handleChange}
                                    value={newComment} 
                                    placeholder="What are your thoughts?"
                                />
                            </form> :
                            <p 
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%"
                                }}
                            >
                                Please sign in to comment!
                            </p>
                        }
                        <div className="comment-section">
                            <p className="sort-header">
                                Sort by:
                                <select onChange={handleSortType}>
                                    <option>Hot</option>
                                    <option>New</option>
                                    <option>Popular</option>
                                </select>
                            </p>
                            {
                                comments === null ? null :
                                (
                                    comments.length ?
                                    comments.map(comment => <Comment key={comment._id} comment={comment}/>) :
                                    <div className="no-comment">
                                        <p style={{fontSize: "16px"}}>No comments yet</p>
                                        <p style={{fontSize: "14px"}}>Be the first the share what you think!</p>
                                    </div>
                                )
                            }
                        </div>
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