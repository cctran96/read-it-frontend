import React, { useState } from "react"
import "./styles.css"
import { AiOutlineFileText, AiOutlinePicture, AiOutlineLink, AiOutlineSearch } from "react-icons/ai"
import { CgPoll } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../actions/postActions"
import { useHistory } from "react-router-dom"
import CommunityForm from "../Community/CommunityForm"
import { storage } from "./Firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Submit = ({ user }) => {
    const emptyFields = {title: "", context: "", community: "", type: "Post"}
    const emptyPoll = {1: "", 2: "", 3: "", 4: ""}

    const [fields, setFields] = useState(emptyFields)
    const [poll, setPoll] = useState(emptyPoll)
    const [showList, setShowList] = useState(false)
    const [list, setList] = useState([])
    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({})
    const pollKeys = Object.keys(poll)
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector(state => state.posts.posts)
    const communities = useSelector(state => state.communities.communities)
    let userCommunities = user ? communities.filter(community => community.users.includes(user._id)) : null
    const [communityFormShow, setCommunityFormShow] = useState(false)

    const handleChange = e => {
        e.preventDefault()
        setFields({...fields, [e.target.name]: e.target.value})
    }

    const handleCommunityClick = (e) => {
        if (e.target.closest("div").className === "community") {
            setShowList(true)
            setList(userCommunities.filter(community => community.name.includes(fields.community))) 
        }else {
            setShowList(false)
        }
    }

    const handleFile = e => {
        const selectedFile = e.target.files[0]
        console.log(selectedFile)
        const fileExt = "image/png"
        const fileExt2 = "image/jpeg"
        // const videoExt = "application/mp4"
        const newErr = []
        if (selectedFile.type !== fileExt){
            newErr.push("file must be a png, jpeg, or mp4 file")
            setFile(null)
        }else {
            setFile(selectedFile)
        }
        setErrors(newErr)
    }

    const handleCommunityChange = (e) => {
        setShowList(true)
        let filteredUserCommunities = userCommunities.filter(community => community.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setList(filteredUserCommunities) 
        setFields({...fields, community: e.target.value})
    }

    const onResults = (e) => {
        setFields({...fields, community: e});
        setShowList(null)
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

    const resetFields = () => {
        setFields(emptyFields)
    }

    const fileName = file ? file.name : null

    const handleSubmit = e => {
        e.preventDefault()
        const storageRef = ref(storage, 'video-image'+fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        
        uploadTask.on('state_changed',
        (snapshot) => {},
        error => {
            const newErrors = []
            newErrors.push(error)
            setErrors({...errors, fileError: newErrors})
        }, () => {
            // storage.ref('video-image').child(`${fileName}`)
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url => {
                console.log(url)
            })
        })
        // let community = communities.find(community => community.name === fields.community)
        // let data = {...fields, creator: user._id, community: community._id}
        // if (fields.type === "Poll") data.context = poll
        // dispatch(createPost(data, history, posts, setErrors, resetFields))
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
        <div className="new-post-container" onClick={handleCommunityClick}>{console.log(errors)}
            <div className="post-creation">
                <div className="post-heading">
                    <h1>Create a Post</h1>
                    <h2>DRAFTS </h2>
                </div>
                <div className="community-button">
                    <div className={`community ${errors.community ? "error" : null}`}>
                        <AiOutlineSearch/>
                        <input 
                            name="community" 
                            value={fields.community} 
                            onChange={handleCommunityChange}
                            placeholder="Community"
                        />
                        { 
                            showList ?
                                <div className="community-list" style={{bottom: `${-1 - list.length * 35}px`}}>
                                    {   
                                        list.length ?
                                        list.map((c) => {
                                            return (
                                                <div className="community-name" onClick={() => onResults(c.name)} key={c._id}>
                                                    {c.name}
                                                </div> 
                                            )
                                        }) : <div className="no-results-found">no results found</div>
                                    }
                                </div> : null
                        }
                    </div>
                    {errors.community ? <p style={{color: "red"}}>{errors.community}</p> : null}
                    <button onClick={() => setCommunityFormShow(true)}>New Community!</button>
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
                        <input onChange={handleChange} name="title" value={fields.title} placeholder="Title" className={errors.title ? "error" : null}/>
                        {errors.title ? <p style={{top: "29px"}}>{errors.title}</p> : null}
                        {
                            fields.type === "Post" ?
                            <>
                                <textarea onChange={handleChange} name="context" value={fields.context} placeholder="Text (optional)" className={errors.context ? "error" : null}/>
                                {errors.context ? <p style={{top: "150px"}}>{errors.context}</p> : null} 
                            </>:
                            (
                                fields.type === "Images / Video" ?
                                <div className="file-container" className={errors.context ? "error" : null}>
                                    <input type="file" name="file" style={{marginBottom: "5px"}} onChange={handleFile}/>
                                    {errors.context ? <p style={{top: "90px"}}>Please choose a file to submit.</p> : null}
                                </div> :
                                (
                                    fields.type === "Link" ?
                                    <>
                                        <input onChange={handleChange} name="context" value={fields.context} placeholder="URL" className={errors.context ? "error" : null}/> 
                                        {errors.context ? <p style={{top: "85px"}}>Please provide a URL to submit</p> : null} 
                                    </>:
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
                                                        className={errors.context ? "error" : null}
                                                    />
                                                </div>)
                                        }
                                        <button className={pollKeys.length > 4 ? "inactive" : null} onClick={addOption}>Add Option</button>
                                        <button className={pollKeys.length < 3 ? "inactive" : null} onClick={deleteOption}>Delete Option</button>
                                        {errors.context ? <p style={{bottom: "35px"}}>Please add atleast 2 options to do the poll.</p> : null} 
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
            <CommunityForm communityFormShow={communityFormShow} setCommunityFormShow={setCommunityFormShow} user={user} setFields={setFields} fields={fields}/>
        </div>
    )
}

export default Submit