import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchStorage } from "./actions/authActions"
import Navbar from "./components/Navigation/Navbar"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStorage())
    })

    return (
        <div className="web-container">
            <Router>
                <Navbar/>
            </Router>
        </div>
    )
}

export default App