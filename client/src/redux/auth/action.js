export const authActionTypes = {
    SET_LOGIN: 'AUTH.SET_LOGIN',
    SET_LOGOUT: 'AUTH.SET_LOGOUT'
}

export const authAtions = {
    setLogin: (userId, token, isAuthenticated) => ({ type: authActionTypes.SET_LOGIN, user: { userId, token, isAuthenticated } }),
    setLogout: (userId, token, isAuthenticated) => ({ type: authActionTypes.SET_LOGIN, user: { userId, token, isAuthenticated } }),
}