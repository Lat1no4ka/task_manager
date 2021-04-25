
import { useSelector } from "react-redux";
import { SubTask } from "./SubTaskForm";
import { TaskForm } from "./TaskForm";
import { useHttp } from "../../hooks/http.hook";
import { useEffect, useState } from "react";
import "./form.scss";


const AddTaskForm = () => {
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const [relations, setRelations] = useState(null);
    useEffect(() => {
    }, [])


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

