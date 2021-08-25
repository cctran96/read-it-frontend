import React, { useState } from "react"
import "./styles.css"
import { IoMdClose } from "react-icons/io"

const Login = ({ toggleLogin }) => {
    const emptyFields = {username: "", password: ""}
    const [login, setLogin] = useState(emptyFields)

    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    return (
        <div className="auth-container">
            <IoMdClose size={30} onClick={toggleLogin}/>
            <form>
                <input 
                    onChange={handleChange}
                    placeholder="Username" 
                    value={login.username} 
                    name="username" 
                    required
                />
                <input
                    onChange={handleChange}
                    placeholder="Password" 
                    value={login.password} 
                    name="password" 
                    type="password" 
                    required
                />
            </form>
        </div>
    )
}

export default Login