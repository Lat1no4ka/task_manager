import { authActionTypes } from "./action";

const initialState = {
    token: null,
    userId: null,
    isAuthenticated: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.SET_LOGIN:
            return { ...state, ...action.user }
        case authActionTypes.SET_LOGOUT:
            return { ...state, ...action.user }
        default:
            return state
    }
}