import React, { useState } from "react"
import { useDispatch } from "react-redux"
import "./styles.css"
import { IoMdClose } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"
import { GiPadlock, GiPadlockOpen } from "react-icons/gi"
import { GoogleLogin } from "react-google-login"
import { FcGoogle } from "react-icons/fc"

const Login = ({ toggleLogin, toggleSignup }) => {
    const dispatch = useDispatch()
    const emptyFields = {email: "", password: ""}

    const [login, setLogin] = useState(emptyFields)

    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch()
    }

    const googleSuccess = async res => {
        const data = { result: res?.profileObj, token: res?.tokenId }
        try {
            dispatch({ type: "AUTH", data })
            toggleLogin()
            localStorage.setItem("profile", data)
        } catch(error) {
            console.log(error)
        }
    }

    const googleFailure = error => {
        console.log(error)
        console.log("Google signin unsuccessful")
    }

    return (
        <div className="auth-container">
            <IoMdClose size={35} onClick={toggleLogin}/>
            <h1>Login</h1>
            <form>
                <div className="input-container">
                    <FaUserAlt size={20}/>
                    <input 
                        onChange={handleChange}
                        placeholder="Email" 
                        value={login.email} 
                        name="email" 
                        required
                    />
                </div>
                <div className="input-container">
                    <GiPadlock size={20}/>
                    <input
                        onChange={handleChange}
                        placeholder="Password" 
                        value={login.password} 
                        name="password" 
                        type="password" 
                        required
                    />
                </div>
            </form>
            <div className="social-login">
                <GoogleLogin
                    clientId="261381993122-7vs1h50qbqhjuuriv8ef4vqat5m13b50.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>
                            <FcGoogle size={25}/>
                            Continue With Google
                        </button>
                    )}
                />
            </div>
            <div className="login-switch">
                <p>Don't have an account?</p>
                <p onClick={toggleSignup} style={{color: "blue", cursor: "pointer"}}>Sign up</p>
            </div>
        </div>
    )
}

export default Login