export const userActionTypes = {
    SET_USER: 'TASK.SET_USER',
}

export const userActions = {
    setUser: (user) => ({ type: userActionTypes.SET_USER, user:{user} })
}