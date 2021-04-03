import { taskActionTypes } from "./action";

const initialState = {
    visible: false,
    task: {
        taskname: "",
        taskdesc: "",
        begdate: "",
        expdate: "",
        prioDir:  { id: "", prioname: "" },
        executor: {id:"", userName:""},
        files: "",
        empid: 1,
        statusDir: 1,
        headid: 1,
        parid: null
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