import React from "react"
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti"
import { useLocation, useHistory } from "react-router-dom"

const Post = ({ post }) => {
    const location = useLocation()
    const history = useHistory()

    const handleLocationCheck = loc => {
        if (location.pathname !== loc) history.push(loc)
    }

    return (
        <div className="post-card-container"> {console.log(post)}
            <div className="vote-container">
                <TiArrowUpOutline/>
                <TiArrowDownOutline/>
            </div>
            <div className="post-content" onClick={() => handleLocationCheck(`/p/${post._id}`)}>
                <p>
                    r/{post.community} • Posted by
                    <b onClick={() => handleLocationCheck(`/u/${post.creator}`)}> {post.creator}</b>
                </p>
                <h1>{post.title}</h1>
                <h2>{post.context}</h2>
            </div>
        </div>
    )
}

export default Post