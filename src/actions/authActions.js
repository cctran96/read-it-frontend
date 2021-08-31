const url = "http://localhost:5000/users/"

export const googleLogin = () => {
    return dispatch => {

    }
}

export const fetchLogin = (body) => {
    return dispatch => {
        const config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        fetch(url + "signin", config)
            .then(res => res.json())
            .then(data => {
                const user = data.result
                dispatch({ type: "AUTH", user })
                localStorage.setItem("jwt", data.token)
            })
            .catch(error => console.log(error))
    }
}

export const fetchStorage = () => {
    return dispatch => {
        
    }
}

export const createAccount = (body) => {
    return dispatch => {
        const config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        fetch(url, config)
            .then(res => res.json())
            .then(data => {
                const user = data.result
                dispatch({ type: "AUTH", user })
                localStorage.setItem("jwt", data.token)
            })
            .catch(error => console.error(error))
    }
}