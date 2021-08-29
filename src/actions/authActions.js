const usersURL = "http://localhost:5000/users"
const loginURL = "http://localhost:5000/login"

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
    }
}