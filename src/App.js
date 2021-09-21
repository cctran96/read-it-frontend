import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchStorage } from "./actions/authActions"
import { getPosts } from "./actions/postActions"
import { fetchUsers } from "./actions/userActions"
import { getCommunities } from "./actions/communityActions"
import Navbar from "./components/Navigation/Navbar"
import Submit from "./components/Post/Submit"
import Post from "./components/Post"
import Profile from "./components/Profile"
import Community from "./components/Community"
import Inbox from "./components/Inbox"

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(fetchStorage())
        dispatch(getPosts())
        dispatch(fetchUsers())
        dispatch(getCommunities())
    }, [dispatch])

    return (
        <div className="web-container">
            <Router>
                <Navbar user={user}/>
                <Route exact path="/submit" render={() => <Submit user={user}/>}/>
                <Route exact path="/inbox" render={() => <Inbox user={user}/>}/>
                <Route path="/p" render={() => <Post user={user}/>}/>
                <Route path="/u" render={() => <Profile user={user}/>}/>
                <Route path="/r" render={() => <Community user={user}/>}/>
            </Router>
        </div>
    )
}

export default App