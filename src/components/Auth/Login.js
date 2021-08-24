import React from "react"
import "./styles.css"
import { IoMdClose } from "react-icons/io"

const Login = ({ toggleLogin }) => {
    return (
        <div className="auth-container">
            <IoMdClose size={30} onClick={toggleLogin}/>
            <form>

            </form>
        </div>
    )
}

export default Login