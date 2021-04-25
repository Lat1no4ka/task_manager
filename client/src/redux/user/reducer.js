import { userActionTypes } from "./action";

const initialState = {
    user: {
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: {
            id: 1,
            rolename: "user"
        }
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER:
            return { ...state, ...action.user }
        default:
            return state
    }
}