import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchStorage } from "./actions/authActions"
import { fetchUsers } from "./actions/userActions"
import Navbar from "./components/Navigation/Navbar"
import Submit from "./components/Post"
import Profile from "./components/Profile"
import Community from "./components/Community"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStorage())
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div className="web-container">
            <Router>
                <Navbar/>
                <Route exact path="/submit" render={() => <Submit/>}/>
                <Route path="/u" render={() => <Profile/>}/>
                <Route path="/r" render={() => <Community/>}/>
            </Router>
        </div>
    )
}

export default App