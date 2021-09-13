import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Loading from "../Misc/Loading"
import Error from "../Misc/Error"

const url = "http://localhost:5000/posts/"

const Post = () => {
    const path = useLocation().pathname.slice(3)

    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(url + path)
        .then(res => res.json())
        .then(data => {
            setPost(data.message ? undefined : data)
        })
    }, [])

    return (
        <div className="post-page-container">
            {
                post ?
                <>
                    <div>

                    </div>
                </> :
                (
                    post === null ? <Loading/> : <Error/>
                )
            }
        </div>
    )
}

export default Post