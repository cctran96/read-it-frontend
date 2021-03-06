import React, { useState, useEffect } from "react"
import book from "../../images/book.png"
import "./styles.css"
import { GoSearch, GoHome } from "react-icons/go"
import { VscDiffAdded, VscMail } from "react-icons/vsc"
import { BsPerson } from "react-icons/bs"
import { motion } from "framer-motion"
import { useHistory, useLocation } from "react-router-dom"
import { debounce } from "../../helpers/debounce"
import { useDispatch } from "react-redux"
import AuthMenu from "../../menus/AuthMenu"
import ProfileMenu from "../../menus/ProfileMenu"

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

const Navbar = ({ user }) => {
    const [width, setWidth] = useState(getWidth())
    const [showSearch, setShowSearch] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [collapse, setCollapse] = useState(width < 600)
    const [search, setSearch] = useState("")

    const toggleSearch = () => setShowSearch(!showSearch)
    
    const dispatch = useDispatch()

    const toggleLogin = () => {
        setShowLogin(!showLogin)
        setShowSignup(false)
        dispatch({ type: "ERROR", errors: null })
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup)
        setShowLogin(false)
        dispatch({ type: "ERROR", errors: null })
    }

    const toggleProfile = () => setShowProfile(!showProfile)

    const history = useHistory()
    const location = useLocation()
    
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

    const handleLocationCheck = loc => {
        if (location.pathname !== loc) history.push(loc)
    }

    const handleUser = () => {
        return (
            user ?
            <>
                <VscDiffAdded onClick={() => handleLocationCheck("/submit")}/>
                <VscMail onClick={() => handleLocationCheck("/inbox")}/>
                <BsPerson onClick={toggleProfile}/>
            </> :
            <>
                <button style={{background: "skyblue"}} onClick={toggleLogin}>Login</button>
                <button style={{background: "silver"}} onClick={toggleSignup}>Sign Up</button>
            </>
        )
    }

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => handleLocationCheck("/")}>
                <img src={book} alt="book"/>
            </div>
            <div className="nav-items">
                {
                    collapse ?
                    <>
                        <div className="nav-icons" style={{marginLeft: "auto"}}>
                            <GoHome onClick={() => handleLocationCheck("/")}/>
                            { handleUser() }
                        </div>
                        <div className="nav-button" onClick={toggleSearch}>
                            <GoSearch size={25}/>
                        </div>
                    </> :
                    <>
                        <div className="input-container">
                            <GoSearch size={25}/>
                            <input value={search} placeholder="Search Read It" onChange={handleChange}/>
                        </div>
                        <div className="nav-icons">
                            <GoHome onClick={() => handleLocationCheck("/")}/>
                            { handleUser() }
                        </div>
                    </>
                }
            </div>
            {
                showSearch ?
                <div className="drop-search">
                    <motion.div className="input-container" initial="start" animate="end" variants={searchVar}>
                        <GoSearch size={25}/>
                        <input value={search} placeholder="Search Read It" onChange={handleChange}/>
                    </motion.div>
                </div>
                : null
            }
            <AuthMenu 
                user={user}
                showLogin={showLogin}
                showSignup={showSignup}
                setShowLogin={setShowLogin}
                setShowSignup={setShowSignup}
                toggleLogin={toggleLogin}
                toggleSignup={toggleSignup}
            />
            {
                showProfile ?                
                <ProfileMenu
                    user={user}
                    collapse={collapse}
                    history={history}
                    showSearch={showSearch}
                    setShowProfile={setShowProfile}
                    handleLocationCheck={handleLocationCheck}
                />
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