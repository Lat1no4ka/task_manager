import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import "./form.scss";

const AddTaskForm = () => {

    const { loading, error, request } = useHttp();
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


    const sendForm = async () => {
        try {
            const data = await request("http://127.0.0.1:8080/addTask", "POST", JSON.stringify({ ...form }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="taskForm">
            <div>
                <h1>Новая задача</h1>
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
                <div className="form-group col-6">
                    <button type="button" className="btn btn-secondary" onClick={() => sendForm()}>Добавить подзадачу</button>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="file">Прикрепить документы</label>
                    <input type="file" className="form-control-file" id="addFile" value={form.files} onChange={e => setForm({ ...form, files: e.target.value })}></input>
                </div>
                <div className="form-group col-12">
                    <button type="button" className="btn btn-secondary" onClick={() => sendForm()}>Отправить</button>
                </div>
            </form>
            <div style={{ display: "none" }}>
                <SubTask />
            </div>
        </div >
    )
}

export default AddTaskForm;

const SubTask = () => {
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

    return (
        <div className="taskForm">
            <div>
                <h1>Новая задача</h1>
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
                <div className="form-group col-6">
                    <label htmlFor="file">Прикрепить документы</label>
                    <input type="file" className="form-control-file" id="addFile" value={form.files} onChange={e => setForm({ ...form, files: e.target.value })}></input>
                </div>
                <div className="form-group col-12">
                    <button type="button" className="btn btn-secondary" onClick={() => console.log({ ...form })}>Добавить</button>
                </div>
            </form>
        </div>
    )
}