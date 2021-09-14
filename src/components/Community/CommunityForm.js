import React from "react"
import "./styles.css"

const CommunityForm = ({ communityFormShow, setCommunityFormShow }) => {

  const handleDiv = e => {
    if(e.target.className === "overlay") {
        setCommunityFormShow(false)
    }
  }

  return (
      <>
          {
              communityFormShow ?
              <div className="overlay" onClick={handleDiv}>
                <div className="modal">
                    <div onClick={() => setCommunityFormShow(false)} style={{cursor: "pointer"}}>x</div>
                    <form className="form-content">
                        <input type="text" placeholder="Community Name"/>
                        <input type="text" placeholder="Community Image"/>
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