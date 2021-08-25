import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from "./components/Navigation/Navbar"

const App = () => {
    return (
        <div className="web-container">
            <Router>
                <Navbar/>
            </Router>
        </div>
    )
}

export default App