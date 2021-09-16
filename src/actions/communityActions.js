const url = "http://localhost:5000/communities/"
const token = localStorage.getItem('token')

export const createCommunity = (body, allCommunities) => {
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
            const communities = [...allCommunities, data]
            data.message ? dispatch({ type: 'COMMUNITYERROR', data}) : dispatch({ type: 'COMMUNITIES', communities})
        })
        .catch(error => console.log(error))
    }
}

export const getCommunities = () => {
    return dispatch => {
        fetch(url)
        .then(resp => resp.json())
        .then(communities => {
            dispatch({ type: 'COMMUNITIES', communities })
        })
    }
}

export const getCommunity = (id) => {
    return dispatch => {
        fetch(`url/${id}`)
        .then(resp => resp.json())
        .then(community => {
            dispatch({ type: 'COMMUNITY', community})
        })
    }
}
