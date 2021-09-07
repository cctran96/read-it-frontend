import React, { useEffect } from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchStorage } from "./actions/authActions"
import Navbar from "./components/Navigation/Navbar"
import Submit from "./components/Post/Submit"
import Profile from "./components/Profile/Profile"

const App = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStorage())
    }, [])

    return (
        <div className="web-container">
            <Router>
                <Navbar/>
                <Route exact path="/submit">
                    {
                        user ? <Submit/> : <Redirect to="/"/>
                    }
                </Route>
                <Route path="/user" render={() => <Profile/>}/>
            </Router>
        </div>
    )
}

export default App