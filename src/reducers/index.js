import { combineReducers } from "redux"
import auth from "./auth"
import posts from "./posts"
import users from "./users"
import inbox from "./inbox"

const rootReducer = combineReducers({
    auth, 
    posts,
    users,
    inbox
})

export default rootReducer