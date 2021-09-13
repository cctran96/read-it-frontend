import React, { useEffect } from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchStorage } from "./actions/authActions"
import Navbar from "./components/Navigation/Navbar"
import Submit from "./components/Post/Submit"
import { getPosts } from "./actions/postActions"
import Community from "./components/Community/Community"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStorage())
        dispatch(getPosts())
    }, [])

    return (
        <div className="web-container">
            <Router>
                <Navbar/>
                <Route exact path="/r/submit">
                    {
                        user ? <Submit/> : <Redirect to="/"/>
                    }
                </Route>
                <Route exact path= "r/community">
                    {
                        user ? <Community/> : <Redirect to="/"/>
                    }
                </Route>
            </Router>
        </div>
    )
}

export default App