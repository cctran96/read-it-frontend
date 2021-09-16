import React, { useState } from "react"
import "./styles.css"
import { createCommunity } from "../../actions/communityActions"
import { useDispatch, useSelector } from "react-redux"
 
const CommunityForm = ({ communityFormShow, setCommunityFormShow, user, setFields, fields }) => {

    const dispatch = useDispatch();
    const communities = useSelector(state => state.communities.communities)
    const [ communityForm, setCommunityForm ] = useState({ name: "", image: "" })

    const handleDiv = e => {
        if(e.target.className === "overlay") {
            setCommunityFormShow(false)
        }
    }

    const handleChange = e => {
        setCommunityForm({...communityForm, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const community = {...communityForm, creator: user._id}
        dispatch(createCommunity(community, communities))
        setFields({...fields, community: community.name})
        setCommunityForm({name: "", image: ""})
        setCommunityFormShow(false)
    }

    const closeForm = () => {
        setCommunityFormShow(false)
        setCommunityForm({name: "", image: ""})
    }

    return (
        <>
            {
                communityFormShow ?
                <div className="overlay" onClick={handleDiv}>
                    <div className="modal">
                        <div onClick={closeForm} style={{cursor: "pointer"}}>x</div>
                        <form className="form-content" onSubmit={handleSubmit}>
                            <input placeholder="Community Name" name="name" value={communityForm.name} onChange={handleChange}/>
                            <input placeholder="Community Image" name="image" value={communityForm.image} onChange={handleChange}/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default CommunityForm;