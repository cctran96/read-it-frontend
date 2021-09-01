import React from "react"
import Login from "../components/Auth/Login"
import Signup from "../components/Auth/Signup"

const AuthMenu = ({user, showLogin, showSignup, toggleLogin, toggleSignup}) => {
    return (
        user ? null :
        (
            showLogin || showSignup ?
            <div className="overlay">
                {
                    showLogin ? <Login toggleLogin={toggleLogin} toggleSignup={toggleSignup}/> :
                    (
                        showSignup ? <Signup toggleLogin={toggleLogin} toggleSignup={toggleSignup}/> : null
                    )
                }
            </div>
            : null
        )
    )
}

export default AuthMenu