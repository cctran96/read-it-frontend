import React, { useState, useEffect } from "react"
import { debounce } from "../../helpers/debounce"
import { GoSearch, GoHome } from "react-icons/go"
import { VscDiffAdded } from "react-icons/vsc"
import { BsPerson } from "react-icons/bs"
import book from "../../images/book.png"
import "./styles.css"

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

const Navbar = () => {
    const [width, setWidth] = useState(getWidth())
    const [isOpen, setIsOpen] = useState(false)
    const [collapse, setCollapse] = useState(width < 600)

    const toggleNav = () => setIsOpen(!isOpen)
    
    const handleResize = debounce(() => {
        const screenWidth = getWidth()
        setCollapse(screenWidth < 600)
        setWidth(screenWidth)
        if (screenWidth > 600) setIsOpen(false)
    })

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [width, collapse, handleResize])

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
                            <GoHome/>
                            <VscDiffAdded/>
                            <BsPerson/>
                        </div>
                        <div className="nav-button">
                            <GoSearch size={25}/>
                        </div>
                    </> :
                    <>
                        <div className="nav-search">
                            <GoSearch size={25}/>
                            <input/>
                        </div>
                        <div className="nav-icons">
                            <GoHome/>
                            <VscDiffAdded/>
                            <BsPerson/>
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar