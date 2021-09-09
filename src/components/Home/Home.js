import React from "react"
import { useSelector } from "react-redux"

const Home = () => {

    const posts = useSelector(state => state.posts.posts)
    return (
        <>
        </>
    )
}

export default Home;