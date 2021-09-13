const url = "http://localhost:5000/users/"

export const fetchUsers = () => {
    return dispatch => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const users = data.users
            dispatch({ type: "USERS", users })
        })
    }
}