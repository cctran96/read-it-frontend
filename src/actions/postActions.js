const url = "http://localhost:5000/posts/"
const token = localStorage.getItem('token')

export const createPost = (body, history) => {
    return dispatch => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
        fetch(url, config)
        .then(res => res.json())
        .then(data => console.log(data))
    }
}