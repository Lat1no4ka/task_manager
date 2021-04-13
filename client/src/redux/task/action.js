export const taskActionTypes = {
    SET_VISIBLE: 'TASK.SET_VISIBLE',
    SET_TASK: 'TASK.SET_TASK',
    SET_SUB_TASK: 'TASK.SUB_TASK',
    SET_SUB_TASK_FILES: 'TASK.SET_SUB_TASK_FILES',
}

export const taskAtions = {
    setVisible: (visible) => ({ type: taskActionTypes.SET_VISIBLE, visible:{visible} }),
    setTask: (task) => ({ type: taskActionTypes.SET_TASK, task:{task} }),
    setSubTask: (subTask) => ({ type: taskActionTypes.SET_SUB_TASK, subTask:{subTask} }),
    setSubTaskFile: (subTaskFile) => ({ type: taskActionTypes.SET_SUB_TASK_FILES, subTaskFile:{subTaskFile} }),
}