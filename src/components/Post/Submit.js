import React, { useState } from "react"
import "./styles.css"
import { AiOutlineFileText, AiOutlinePicture, AiOutlineLink, AiOutlineSearch } from "react-icons/ai"
import { CgPoll } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../actions/postActions"
import { useHistory } from "react-router-dom"
import CommunityForm from "../Community/CommunityForm"

const Submit = ({ user }) => {
    const emptyFields = {title: "", context: "", community: "", type: "Post"}
    const emptyPoll = {1: "", 2: "", 3: "", 4: ""}

    const [fields, setFields] = useState(emptyFields)
    const [poll, setPoll] = useState(emptyPoll)
    const pollKeys = Object.keys(poll)
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector(state => state.posts.posts)
    const [communityFormShow, setCommunityFormShow] = useState(false)

    const handleChange = e => {
        e.preventDefault()
        setFields({...fields, [e.target.name]: e.target.value})
    }

    const handlePostType = e => {
        const type = e.target.closest("div").innerText
        setFields({...fields, type })
    }

    const activeStyle = text => (
        fields.type === text ?
        {
            border: "2px solid black",
            backgroundColor: "#e7e2e2"
        } :
        {
            border: "1px solid black"
        }
    )

    const handleSubmit = e => {
        e.preventDefault()
        let data = {...fields, creator: user.username}
        if (fields.type === "Poll") data.context = poll
        dispatch(createPost(data, history, posts))
    }

    const addOption = e => {
        e.preventDefault()
        const newOption = pollKeys.length + 1
        if (newOption < 6) setPoll({...poll, [newOption]: ""})
    }

    const deleteOption = e => {
        e.preventDefault()
        const length = pollKeys.length
        let newPoll = {...poll}
         if (length > 2) delete newPoll[length]
         setPoll(newPoll)
    }

    const handlePollOptions = e => {
        setPoll({...poll, [e.target.name]: e.target.value})
    }

    return (
        <div className="new-post-container">
            <div className="post-creation">
                <div className="post-heading">
                    <h1>Create a Post</h1>
                    <h2>DRAFTS </h2>
                </div>
                <div className="community-button">
                    <div className="community">
                        <AiOutlineSearch/>
                        <input 
                            name="community" 
                            value={fields.community} 
                            onChange={handleChange}
                            placeholder="Community"
                        />
                    </div>
                    <button onClick={() => setCommunityFormShow(true)}>Create a Community!</button>
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
                    <form className="post-form" onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="title" value={fields.title} placeholder="Title"/>
                        {
                            fields.type === "Post" ?
                            <textarea onChange={handleChange} name="context" value={fields.context} placeholder="Text (optional)"/> :
                            (
                                fields.type === "Images / Video" ?
                                <div className="file-container">
                                    <input type="file" name="file" style={{marginBottom: "5px"}}/>
                                </div> :
                                (
                                    fields.type === "Link" ?
                                    <input onChange={handleChange} name="context" value={fields.context} placeholder="URL"/> :
                                    <div className="poll-option-container">
                                        {
                                            pollKeys.map(option => 
                                                <div key={option}>
                                                    {option}. 
                                                    <input 
                                                        onChange={handlePollOptions} 
                                                        name={option}
                                                        value={poll[option]} 
                                                        placeholder={`Option ${option}`}
                                                    />
                                                </div>)
                                        }
                                        <button className={pollKeys.length > 4 ? "inactive" : null} onClick={addOption}>Add Option</button>
                                        <button className={pollKeys.length < 3 ? "inactive" : null} onClick={deleteOption}>Delete Option</button>
                                    </div>
                                )
                            )
                        }
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
            <div className="post-sidebar">

            </div>
            <CommunityForm communityFormShow={communityFormShow} setCommunityFormShow={setCommunityFormShow} user={user}/>
        </div>
    )
}

export default Submit