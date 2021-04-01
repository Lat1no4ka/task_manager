
import { useSelector } from "react-redux";
import { SubTask } from "./SubTaskForm";
import { TaskForm } from "./TaskForm";
import "./form.scss";


const AddTaskForm = () => {
    const task = useSelector((state) => state.task);
    console.log("task.subTask")
    console.log(task.task)
    if (!task.visible) {
        return (
            <TaskForm />
        )
    } else {
        return (
            <SubTask />
        )
    }
}

export default AddTaskForm;

