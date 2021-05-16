
import { useSelector } from "react-redux";
import { SubTask } from "./SubTaskForm";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import "./form.scss";


const AddTaskForm = () => {
    const task = useSelector((state) => state.task);
    const [relations, setRelations] = useState(null);

    if (!task.visible) {

        return (
            <TaskForm relations={relations} />
        )
    } else {
        return (
            <SubTask relations={relations} />
        )
    }
}

export default AddTaskForm;

