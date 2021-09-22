const url = "http://localhost:5000/posts/"
const token = localStorage.getItem('token')

export const createPost = (body, history, allPosts, callback, resetFields) => {
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
            if (data.errors) {
                typeof callback === "function" && callback(data.errors)
            }else {
                const posts = [...allPosts, data]
                dispatch({ type: 'POSTS', posts })
                typeof resetFields === "function" && resetFields();
            }
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