import { taskActionTypes } from "./action";

const date = new Date()

const initialState = {
    visible: false,
    task: {
        taskName: "",
        taskDesc: "",
        begDate: `${date.getFullYear()}-${("0"+(date.getMonth() + 1)).slice(-2)}-${("0"+date.getDate()).slice(-2)}`,
        endDate:  `${date.getFullYear()}-${("0"+(date.getMonth() + 1)).slice(-2)}-${("0"+date.getDate()).slice(-2)}`,
        priority: { id: "", priorityName: "" },
        employee: [],
        files: [],
        status: 1,
        author: JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData"))?.data.id : null,
        parentId: null
    },
    subTask: [],
    subTaskFile: []
}

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case taskActionTypes.SET_VISIBLE:
            return { ...state, ...action.visible }
        case taskActionTypes.SET_TASK:
            return { ...state, ...action.task }
        case taskActionTypes.SET_SUB_TASK:
            return { ...state, ...action.subTask }
        case taskActionTypes.SET_SUB_TASK_FILES:
            return { ...state, ...action.subTaskFile}
        default:
            return state
    }
}