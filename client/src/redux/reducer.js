import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { taskReducer } from "./task";
import { userReducer } from "./user/reducer";

export const reducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    user: userReducer
})
