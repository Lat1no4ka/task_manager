import { useState } from "react";
import "./form.scss";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
export const SubTask = () => {
    const dispatch = useDispatch();
    const task = useSelector((state) => state.task);
    const [form, setForm] = useState(
        {
            taskname: "",
            taskdesc: "",
            begdate: "",
            expdate: "",
            prioDir: "",
            executor: "",
            files: "",
            empid: 1,
            stateDir: 1,
            headid: 1,
            parid: null
        }
    );

    const addSubTask = (e) => {
        e.preventDefault();
        task.subTask.push(form)
        dispatch(taskAtions.setSubTask(task.subTask));
        dispatch(taskAtions.setVisible(false));
    }

    const cancel = (e) => {
        dispatch(taskAtions.setVisible(false));
    }
    return (
        <div className="subTaskForm">
            <div>
                <h1>Дополнительная задача</h1>
            </div>

            <form className="d-flex row">
                <div className="form-group col-6">
                    <label>Название</label>
                    <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskname} onChange={(e) => setForm({ ...form, taskname: e.target.value })}></input>
                </div>
                <div className="form-group col-12">
                    <label>Описание</label>
                    <textarea className="form-control" id="descOfTask" value={form.taskdesc} onChange={e => setForm({ ...form, taskdesc: e.target.value })}></textarea>
                </div>
                <div className="form-group col-6">
                    <label>Дата начала:</label>
                    <input type="date" className="form-control" id="begdate" value={form.begdate} onChange={(e) => setForm({ ...form, begdate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Дата окончания:</label>
                    <input type="date" className="form-control" id="expdate" value={form.expdate} onChange={(e) => setForm({ ...form, expdate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="select">Назначена:</label>
                    <select className="form-control" id="executor" value={form.executor} onChange={e => setForm({ ...form, executor: e.target.value })}>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="select">Приоритет</label>
                    <select className="form-control" id="prioDir" value={form.prioDir} onChange={e => setForm({ ...form, prioDir: e.target.value })}>
                        <option></option>
                        <option>2</option>
                    </select>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="file">Прикрепить документы</label>
                    <input type="file" className="form-control-file" id="addFile" value={form.files} onChange={e => setForm({ ...form, files: e.target.value })}></input>
                </div>
                <div className="form-group col-2">
                    <button type="button" className="btn btn-secondary" onClick={(e) => addSubTask(e)}>Добавить</button>
                </div>
                <div className="form-group col-2">
                    <button type="button" className="btn btn-secondary" onClick={(e) => cancel(e)}>Отмена</button>
                </div>
            </form>
        </div>
    )
}