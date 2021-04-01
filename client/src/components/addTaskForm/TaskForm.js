import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import "./form.scss";

export const TaskForm = () => {
    const { loading, error, request } = useHttp();
    const task = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const form = {
        taskname: "",
        taskdesc: "",
        begdate: "",
        expdate: "",
        prioDir: "",
        executor: "",
        files: "",
        empid: 1,
        statusDir: 1,
        headid: 1,
        parid: null
    }

    const VisibleSubTaskFrom = (e) => {
        e.preventDefault();
        dispatch(taskAtions.setVisible({ visible: true }));
    }

    const sendForm = async () => {
        try {
            const data = await request("http://127.0.0.1:8080/addTask", "POST", JSON.stringify({ ...task.task }))
                .then((id) => {
                    dispatch(taskAtions.setTask(form));
                    task.subTask.forEach(subTask => {
                        subTask.parid = id;
                    });
                    try {
                        request("http://127.0.0.1:8080/addSubtask", "POST", JSON.stringify(task.subTask))
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    const cacheTaskForm = (e, param) => {
        e.preventDefault();
        dispatch(taskAtions.setTask(param))
    }
    const saveTask = (e) => {
        e.preventDefault();
        sendForm();
    }

    return (
        <div className="taskForm">
            <div>
                <h1>Новая задача</h1>
            </div>

            <form className="d-flex row">
                <div className="form-group col-6">
                    <label>Название</label>
                    <input type="value" className="form-control" id="nameOfTask" placeholder="" value={task.task.taskname} onChange={(e) => cacheTaskForm(e, { ...task.task, taskname: e.target.value })}></input>
                </div>
                <div className="form-group col-12">
                    <label>Описание</label>
                    <textarea className="form-control" id="descOfTask" value={task.task.taskdesc} onChange={e => cacheTaskForm(e, { ...task.task, taskdesc: e.target.value })}></textarea>
                </div>
                <div className="form-group col-6">
                    <label>Дата начала:</label>
                    <input type="date" className="form-control" id="begdate" value={task.task.begdate} onChange={(e) => cacheTaskForm(e, { ...task.task, begdate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Дата окончания:</label>
                    <input type="date" className="form-control" id="expdate" value={task.task.expdate} onChange={(e) => cacheTaskForm(e, { ...task.task, expdate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="select">Назначена:</label>
                    <select className="form-control" id="executor" value={task.task.executor} onChange={e => cacheTaskForm(e, { ...task.task, executor: e.target.value })}>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="select">Приоритет</label>
                    <select className="form-control" id="prioDir" value={task.task.prioDir} onChange={e => cacheTaskForm(e, { ...task.task, prioDir: e.target.value })}>
                        <option></option>
                        <option>2</option>
                    </select>
                </div>
                <div className="form-group col-6">
                    <button type="button" className="btn btn-secondary" onClick={e => VisibleSubTaskFrom(e)} >Добавить подзадачу</button>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="file">Прикрепить документы</label>
                    <input type="file" className="form-control-file" id="addFile" value={task.task.files} onChange={e => cacheTaskForm(e, { ...task.task, files: e.target.value })}></input>
                </div>
                <div className="form-group col-12">
                    <button type="button" className="btn btn-secondary" onClick={e => saveTask(e)} >Создать задачу</button>
                </div>
            </form>
        </div >
    )
}

