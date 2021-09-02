import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchStorage } from "./actions/authActions"
import Navbar from "./components/Navigation/Navbar"
import Submit from "./components/Post/Submit"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStorage())
    })

    return (
        <div className="web-container">
            <Router>
                <Navbar/>
                <Route exact path="/submit" render={() => <Submit/>}/>
            </Router>
        </div>
    )
}

export default App