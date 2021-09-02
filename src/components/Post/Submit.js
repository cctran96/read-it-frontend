import React, { useState } from "react"
import "./styles.css"
import { AiOutlineFileText, AiOutlinePicture, AiOutlineLink, AiOutlineSearch } from "react-icons/ai"
import { CgPoll } from "react-icons/cg"

const Submit = () => {
    const emptyFields = {title: "", context: "", community: ""}

    const [fields, setFields] = useState(emptyFields)
    const [activeType, setActiveType] = useState("Post")

    const handleChange = e => {
        e.preventDefault()
        setFields({...fields, [e.target.name]: e.target.value})
    }

    const handlePostType = e => {
        setActiveType(e.target.closest("div").innerText)
    }

    const activeStyle = text => (
        {
            border: `${activeType === text ? "2px" : "1px" } solid black`
        }
    )

    return (
        <div className="new-post-container">
            <div className="post-creation">
                <div className="post-heading">
                    <h1>Create a Post</h1>
                    <h2>DRAFTS </h2>
                </div>
                <div className="community">
                    <AiOutlineSearch/>
                    <input 
                        name="community" 
                        value={fields.community} 
                        onChange={handleChange}
                        placeholder="Community"
                    />
                </div>
                <div className="post-types">
                    <div onClick={handlePostType} style={activeStyle("Post")}>
                        <AiOutlineFileText/>
                        Post
                    </div>
                    <div onClick={handlePostType} style={activeStyle("Images / Video")}>
                        <AiOutlinePicture/>
                        Images / Video
                    </div>
                    <div onClick={handlePostType} style={activeStyle("Link")}>
                        <AiOutlineLink/>
                        Link
                    </div>
                    <div onClick={handlePostType} style={activeStyle("Poll")}>
                        <CgPoll/>
                        Poll
                    </div>
                </div>
                <div className="post-form-container">
                    <form className="post-form">
                        <input onChange={handleChange} name="title" value={fields.title} placeholder="Title"/>
                        <textarea onChange={handleChange} name="context" value={fields.context} placeholder="Text (optional)"/>
                    </form>
                </div>
            </div>
            <div className="post-sidebar">

            </div>
        </div>
    )
}

export default Submit