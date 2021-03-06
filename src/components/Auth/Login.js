import React, { useState } from "react"
import "./styles.css"
import { useDispatch } from "react-redux"
import { fetchLogin } from "../../actions/authActions"
import { IoMdClose } from "react-icons/io"
import { FaUserAlt, FaEyeSlash, FaEye } from "react-icons/fa"
import { GiPadlock, GiPadlockOpen } from "react-icons/gi"
import { GoogleLogin } from "react-google-login"
import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

const Login = ({ toggleLogin, toggleSignup }) => {
    const dispatch = useDispatch()
    const errors = useSelector(state => state.auth.errors)
    const emptyFields = {email: "", password: ""}

    const [login, setLogin] = useState(emptyFields)
    const [showPass, setShowPass] = useState(false)

    const togglePass = () => {
        setShowPass(!showPass)
    }

    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(fetchLogin(login, toggleLogin))
    }

    const googleSuccess = async res => {
        const user = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: "AUTH", user })
            toggleLogin()
            localStorage.setItem("token", token)
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
            <form onSubmit={handleSubmit}>
                <div className={`input-container ${errors ? "error" : null}`}>
                    <FaUserAlt size={20}/>
                    <input 
                        onChange={handleChange}
                        placeholder="Email or Username" 
                        value={login.email} 
                        name="email" 
                        required
                    />
                </div>
                <div className={`input-container ${errors ? "error" : null}`}>
                    {
                        showPass ? <GiPadlockOpen size={20}/> : <GiPadlock size={20}/>
                    }
                    <input
                        onChange={handleChange}
                        placeholder="Password" 
                        value={login.password} 
                        name="password" 
                        type={showPass ? "text" : "password"} 
                        required
                    />
                    {
                        showPass ? 
                        <FaEye onClick={togglePass} size={20} style={style}/> :
                        <FaEyeSlash onClick={togglePass} size={20} style={style}/>
                    }
                </div>
                <input className="auth-submit" type="submit" value="Log In"/>
                { errors ? <p style={{top: "75px"}}>{errors.both}</p> : null}
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

const style ={
    marginRight: "5px",
    cursor:"pointer"
}