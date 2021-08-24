import React from "react"
import "./styles.css"
import { IoMdClose } from "react-icons/io"

const Signup = ({ toggleSignup }) => {
    return (
        <div className="auth-container">
            <IoMdClose size={30} onClick={toggleSignup}/>
            <form>

            </form>
        </div>
    )
}

export default Signup