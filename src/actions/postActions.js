const url = "http://localhost:5000/posts/"
const token = localStorage.getItem('token')

export const createPost = (body, history, allPosts) => {
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
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            const posts = [...allPosts, data]
            dispatch({ type: 'POSTS', posts })
        })
        .catch(error => console.log(error))
    }
}


export const getPosts = () => {
    return dispatch => {
       fetch(url)
       .then(resp => resp.json())
       .then(posts => {
           dispatch({ type: 'POSTS', posts })
       })
    }
}