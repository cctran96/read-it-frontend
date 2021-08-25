import React, { useState } from "react"
import "./styles.css"
import { IoMdClose } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"
import { GiPadlock, GiPadlockOpen } from "react-icons/gi"

const Login = ({ toggleLogin }) => {
    const emptyFields = {username: "", password: ""}
    const [login, setLogin] = useState(emptyFields)

    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
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
                        placeholder="Username" 
                        value={login.username} 
                        name="username" 
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
        </div>
    )
}

export default Login