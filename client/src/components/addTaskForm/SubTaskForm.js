import { useState, useEffect } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import { CaretDownFill } from 'react-bootstrap-icons';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./form.scss";

export const SubTask = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const userId = useSelector((state) => state.auth.userId);
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [form, setForm] = useState(
        {
            taskName: "",
            taskDesc: "",
            begDate: "",
            endDate: "",
            priority: { id: "", priorityName: "" },
            employee: { id: "", userName: "" },
            files: [],
            status: 1,
            author: userId,
            parentId: null
        }
    );

    const [files, setFiles] = useState([]);


    useEffect(() => {
        if (!users.length)
            getUsers()
        if (!priority.length)
            getPriority()
    }, [users, priority])


    const addSubTask = (e) => {
        e.preventDefault();
        setSubTaskFile();
        task.subTask.push(form)
        dispatch(taskAtions.setSubTask(task.subTask));
        dispatch(taskAtions.setVisible(false));
    }

    const cancel = (e) => {
        dispatch(taskAtions.setVisible(false));
    }

    const getUsers = async () => {
        const response = await request(`${process.env.REACT_APP_API_URL}/allUsers`, "GET");
        const users = await response.map(user => {
            return { id: user.id, name: user.userName }
        })
        setUsers(users);
    }

    const getPriority = async () => {
        const priority = await request(`${process.env.REACT_APP_API_URL}/getPriority`, "GET");
        setPriority(priority);
    }

    const setSubTaskFile = () => {

        if (form.files.length) {
            task.subTaskFile.push(form.files)
            dispatch(taskAtions.setSubTaskFile(task.subTaskFile));
        }
    }

    const prepareSubTaskFiles = (e) => {
        form.files.push(...e.target.files)
        return form.files
    }

    return (
        <div className="subTaskForm">
            <div>
                <h1>Дополнительная задача</h1>
            </div>

            <form className="d-flex row">
                <div className="form-group col-6">
                    <label>Название</label>
                    <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskName} onChange={(e) => setForm({ ...form, taskName: e.target.value })}></input>
                </div>
                <div className="form-group col-12 desc_task">
                    <label>Описание</label>
                    <textarea className="form-control" id="descOfTask" value={form.taskDesc} onChange={e => setForm({ ...form, taskDesc: e.target.value })}></textarea>
                </div>
                <div className="form-group col-6">
                    <label>Дата начала:</label>
                    <input type="date" className="form-control" id="begdate" value={form.begDate} onChange={(e) => setForm({ ...form, begDate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Дата окончания:</label>
                    <input type="date" className="form-control" id="expdate" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Назначена:</label>
                    <Typeahead
                        clearButton
                        labelKey="name"
                        id="selections-example"
                        onChange={(user) => setForm({ ...form, employee: { id: user[0]?.id, userName: user[0]?.userName } })}
                        options={users.length ? users : []}
                        placeholder="Назначить на"
                    />
                </div>
                <div className="form-group col-6" >
                    <label>Приоритет</label>
                    <select className="custom-select" id="inputGroupSelect01"
                        onClick={e => setForm({ ...form, priority: { id: e.target.value, priorityName: e.target.options[e.target.options.selectedIndex]?.text } })}>
                        <option hidden value={null}></option>
                        {
                            priority.length ?
                                priority.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.priorityName}</option>
                                }) : null
                        }
                    </select>
                </div>
                <div className="form-group col-5">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" multiple={true}
                            onChange={e => {
                                setForm({ ...form, files: prepareSubTaskFiles(e) })
                            }}
                        >
                        </input>
                        <label className="custom-file-label">Выбирите файл</label>
                    </div>
                    <div>
                        {form.files.map((file, index) => {
                            return <p className="m-2" key={index}>{file.name}</p>
                        })}
                    </div>
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