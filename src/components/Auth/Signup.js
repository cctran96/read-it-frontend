import React, { useState } from "react"
import "./styles.css"
import { IoMdClose } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"
import { GiPadlock } from "react-icons/gi"

const Signup = ({ toggleSignup }) => {
    const emptyFields = {username: "", password: "", confirm: ""}
    const [signup, setSignup] = useState(emptyFields)

    const handleChange = e => {
        setSignup({...signup, [e.target.name]: e.target.value})
    }

    return (
        <div className="auth-container">
            <IoMdClose size={35} onClick={toggleSignup}/>
            <h1>Login</h1>
            <form>
                <div className="input-container">
                    <FaUserAlt size={20}/>
                    <input 
                        onChange={handleChange}
                        placeholder="Username" 
                        value={signup.username} 
                        name="username" 
                        required
                    />
                </div>
                <div className="input-container">
                    <GiPadlock size={20}/>
                    <input
                        onChange={handleChange}
                        placeholder="Password" 
                        value={signup.password} 
                        name="password" 
                        type="password" 
                        required
                    />
                </div>
                <div className="input-container">
                    <GiPadlock size={20}/>
                    <input
                        onChange={handleChange}
                        placeholder="Confirm Password" 
                        value={signup.password} 
                        name="confirm" 
                        type="password" 
                        required
                    />
                </div>
            </form>
        </div>
    )
}

export default Signup