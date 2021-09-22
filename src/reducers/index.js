import { combineReducers } from "redux"
import auth from "./auth"
import posts from "./posts"
import users from "./users"
import communities from "./communities"

const rootReducer = combineReducers({
    auth, 
    posts,
    users,
    communities
})

export default rootReducer