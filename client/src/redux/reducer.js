import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { taskReducer } from "./task";

export const reducer = combineReducers({
    auth: authReducer,
    task: taskReducer
})

