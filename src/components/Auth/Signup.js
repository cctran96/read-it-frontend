import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createAccount } from "../../actions/authActions"
import "./styles.css"
import { IoMdClose } from "react-icons/io"
import { FaUserAlt, FaEyeSlash, FaEye } from "react-icons/fa"
import { GiPadlock, GiPadlockOpen } from "react-icons/gi"
import { MdEmail } from "react-icons/md"

const Signup = ({ toggleLogin, toggleSignup }) => {
    const dispatch = useDispatch()
    const emptyFields = {username: "", email: "", password: "", confirm: ""}

    const [signup, setSignup] = useState(emptyFields)
    const [showPass, setShowPass] = useState(false)

    const togglePass = () => {
        setShowPass(!showPass)
    }

    const handleChange = e => {
        setSignup({...signup, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createAccount(signup, toggleSignup))
    }

    return (
        <div className="auth-container">
            <IoMdClose size={35} onClick={toggleSignup}/>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
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
                    <MdEmail size={20}/>
                    <input 
                        onChange={handleChange}
                        placeholder="Email" 
                        value={signup.email} 
                        name="email" 
                        required
                    />
                </div>
                <div className="input-container">
                    {
                        showPass ? <GiPadlockOpen size={20}/> : <GiPadlock size={20}/>
                    }
                    <input
                        onChange={handleChange}
                        placeholder="Password" 
                        value={signup.password} 
                        name="password" 
                        type="password" 
                        required
                    />
                    {
                        showPass ? 
                        <FaEye onClick={togglePass} size={20} style={style}/> :
                        <FaEyeSlash onClick={togglePass} size={20} style={style}/>
                    }
                </div>
                <div className="input-container">
                    {
                        showPass ? <GiPadlockOpen size={20}/> : <GiPadlock size={20}/>
                    }
                    <input
                        onChange={handleChange}
                        placeholder="Confirm Password" 
                        value={signup.confirm} 
                        name="confirm" 
                        type="password" 
                        required
                    />
                    {
                        showPass ? 
                        <FaEye onClick={togglePass} size={20} style={style}/> :
                        <FaEyeSlash onClick={togglePass} size={20} style={style}/>
                    }
                </div>
                <input className="auth-submit" type="submit" value="Sign Up"/>
            </form>
            <div className="login-switch">
                <p>Already have an account?</p>
                <p onClick={toggleLogin} style={{color: "blue", cursor: "pointer"}}>Log in</p>
            </div>
        </div>
    )
}

export default Signup

const style ={
    marginRight: "5px",
    cursor:"pointer"
}