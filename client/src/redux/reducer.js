import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { taskReducer } from "./task";
import { userReducer } from "./user/reducer";

export const reducer = combineReducers({
    auth: authReducer,
<<<<<<< HEAD
    task: taskReducer,
    user: userReducer
})
=======
    task: taskReducer
})

>>>>>>> 5b7197279b15feec685cc458a969df027995ac70
