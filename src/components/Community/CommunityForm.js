import React from "react"
import "./styles.css"
import { Modal } from "react-bootstrap"

const CommunityForm = ({ communityFormShow, setCommunityFormShow }) => {
    return (
        <Modal show={communityFormShow} onHide={() => setCommunityFormShow(false)} animation={false}>
            <Modal.Header closeButton></Modal.Header>
            <form className="form-content">
                <input type="text" placeholder="Community Name"/>
                <input type="text" placeholder="Community Image"/>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    )
}

export default CommunityForm;