const url = "http://localhost:5000/users/"

export const fetchLogin = (body, callback) => {
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
                localStorage.setItem("token", data.token)
                typeof callback === "function" && callback()
            })
            .catch(error => console.log(error))
    }
}

export const fetchStorage = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (token?.length < 500) {
            const config = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            fetch(url + "signin", config)
                .then(res => res.json())
                .then(data => {
                    if (data.errors) localStorage.removeItem("token")
                    else {
                        const user = data.result
                        dispatch({ type: "AUTH", user })
                    }
                })
                .catch(error => console.log(error))
        }
    }
}

export const createAccount = (body, callback) => {
    return dispatch => {
        const config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        fetch(url, config)
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    const errors = data.errors
                    dispatch({ type: "ERROR", errors })
                } else {
                    const user = data.result
                    dispatch({ type: "AUTH", user })
                    localStorage.setItem("token", data.token)
                    typeof callback === "function" && callback()
                }
            })
            .catch(error => console.error(error))
    }
}

export const logOutAccount = (history) => {
    return dispatch => {
        dispatch({ type: "LOGOUT" })
        history.push("/")
        localStorage.removeItem("token")
    }
}