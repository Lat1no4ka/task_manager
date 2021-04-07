import { taskActionTypes } from "./action";

const initialState = {
    visible: false,
    task: {
        taskName: "",
        taskDesc: "",
        begDate: "",
        endDate: "",
        priority: { id: "", priorityName: "" },
        employee: { id: "", userName: "" },
        files: "",
        status: 1,
        author: JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")).userId : null,
        parentId: null
    },
    subTask: []
}

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case taskActionTypes.SET_VISIBLE:
            return { ...state, ...action.visible }
        case taskActionTypes.SET_TASK:
            return { ...state, ...action.task }
        case taskActionTypes.SET_SUB_TASK:
            return { ...state, ...action.subTask }
        default:
            return state
    }
}