import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { useHistory } from "react-router-dom"
import { debounce } from "../../helpers/debounce"
import { GoSearch, GoHome } from "react-icons/go"
import { VscDiffAdded } from "react-icons/vsc"
import { BsPerson } from "react-icons/bs"
import book from "../../images/book.png"
import Login from "../Auth/Login"
import Signup from "../Auth/Signup"
import "./styles.css"

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

const Navbar = () => {
    const [width, setWidth] = useState(getWidth())
    const [showSearch, setShowSearch] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [collapse, setCollapse] = useState(width < 600)
    const [search, setSearch] = useState("")

    const toggleSearch = () => setShowSearch(!showSearch)

    const toggleLogin = () => {
        setShowLogin(!showLogin)
        setShowSignup(false)
    }

    const toggleSignup = () => {
        setShowSignup(!showLogin)
        setShowLogin(false)
    }

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleResize = debounce(() => {
        const screenWidth = getWidth()
        setCollapse(screenWidth < 600)
        setWidth(screenWidth)
        if (screenWidth > 600) setShowSearch(false)
    })

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [width, collapse, handleResize])

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const handleUser = () => {
        return (
            user ?
            <>
                <VscDiffAdded/>
                <BsPerson/>
            </> :
            <>
                <button style={{background: "skyblue"}} onClick={toggleLogin}>Login</button>
                <button style={{background: "silver"}}>Sign Up</button>
            </>
        )
    }

    return (
        <nav className="navbar">
            <a className="logo" href="/">
                <img src={book} alt="book"/>
            </a>
            <div className="nav-items">
                {
                    collapse ?
                    <>
                        <div className="nav-icons" style={{marginLeft: "auto"}}>
                            <GoHome onClick={() => history.push("/")}/>
                            { handleUser() }
                        </div>
                        <div className="nav-button" onClick={toggleSearch}>
                            <GoSearch size={25}/>
                        </div>
                    </> :
                    <>
                        <div className="nav-search">
                            <GoSearch size={25}/>
                            <input value={search} placeholder="Search Read It" onChange={handleChange}/>
                        </div>
                        <div className="nav-icons">
                            <GoHome onClick={() => history.push("/")}/>
                            { handleUser() }
                        </div>
                    </>
                }
            </div>
            {
                showSearch ?
                <div className="drop-search">
                    <motion.div className="nav-search" initial="start" animate="end" variants={searchVar}>
                        <GoSearch size={25}/>
                        <input value={search} placeholder="Search Read It" onChange={handleChange}/>
                    </motion.div>
                </div>
                : null
            }
            {
                showLogin || showSignup ?
                <div className="overlay">
                    {
                        showLogin ? <Login toggleLogin={toggleLogin}/> :
                        (
                            showSignup ? <Signup toggleSignup={toggleSignup}/> : null
                        )
                    }
                </div>
                : null
            }
        </nav>
    )
}

export default Navbar

const searchVar = {
    start: {y: -10, opacity: 0},
    end: {y: 0, opacity: 1, transition: {duration: 0.2}}
}