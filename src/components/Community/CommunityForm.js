import React from "react"
import "./styles.css"

const CommunityForm = ({ communityFormShow, setCommunityFormShow }) => {
    return (
        <div show={communityFormShow} onHide={() => setCommunityFormShow(false)} animation={false}>
            <div closeButton></div>
            <form className="form-content">
                <input type="text" placeholder="Community Name"/>
                <input type="text" placeholder="Community Image"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CommunityForm;