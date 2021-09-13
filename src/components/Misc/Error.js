import React from "react"
import { useHistory } from "react-router"

const Error = () => {
    const history = useHistory()

    return (
        <div className="error-container">
            <h1>Oops! Page not found.</h1>
            <p>Click <b onClick={() => history.push("/")}>here</b> to return home.</p>
        </div>
    )
}

export default Error