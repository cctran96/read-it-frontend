import { combineReducers } from "redux"
import auth from "./auth"
import posts from "./posts"
import users from "./users"
import communities from "./communities"
import inbox from "./inbox"

const rootReducer = combineReducers({
    auth, 
    posts,
    users,
    communities,
    inbox
})

export default rootReducer