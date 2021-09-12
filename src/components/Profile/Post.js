import React from "react"
import { ImArrowUp, ImArrowDown } from "react-icons/im"

const Post = ({ post }) => {
    return (
        <div className="post-card-container"> {console.log(post)}
            <div className="vote-container">
                <ImArrowUp/>
                <ImArrowDown/>
            </div>
            <div className="post-content">
                <p>r/{post.community} • Posted by {post.creator}</p>
                <h1>{post.title}</h1>
                <h2>{post.context}</h2>
            </div>
        </div>
    )
}

export default Post