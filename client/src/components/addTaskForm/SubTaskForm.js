import { useState } from "react";
import "./form.scss";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import { CaretDownFill } from 'react-bootstrap-icons';
export const SubTask = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const userId = useSelector((state) => state.auth.userId);
    const [toggle, setToggle] = useState(false);
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [usersFilter, setUsersFilter] = useState([]);
    const [searchListUser, setSearchListUser] = useState(false);
    const [listPriority, setListPriority] = useState(false);
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

    const sendFile = async (taskId, propFiles) => {
        const formData = new FormData();
        propFiles.forEach(file => {
            formData.append('file', file)
        });
        formData.append('taskId', taskId)
        const headers = { 'Access-Control-Allow-Credentials': 'true' }
        await request("http://127.0.0.1:8080/uploadFiles", "POST", formData, headers)
    }

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
        const users = await request("http://127.0.0.1:8080/allUsers", "GET");
        setUsers(users);
    }

    const getPriority = async () => {
        const priority = await request("http://127.0.0.1:8080/getPriority", "GET");
        setPriority(priority);
    }

    const searchListUserVisible = (searchText, visible) => {
        setSearchListUser(visible);
        if (searchText.length > 1) {
            let filterUser = users.filter((user) => {
                return user ? !user.userName.indexOf(searchText) : null;
            })
            setUsersFilter(filterUser);
        } else {
            setUsersFilter(users);
        }
    }

    const setSubTaskFile = () => {
        task.subTaskFile.push(form.files)
        dispatch(taskAtions.setSubTaskFile(task.subTaskFile));
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
                <div className="form-group col-12">
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
                    <input type="input" className="form-control" id="expdate"
                        value={form.employee.userName}
                        onFocus={
                            (e) => {
                                searchListUserVisible(e.target.value, true);
                                console.log(form)
                            }

                        }
                        onChange={(e) => {
                            if (users.length < 1) { getUsers(); }
                            setForm({ ...form, employee: { id: "", userName: e.target.value } });
                            searchListUserVisible(e.target.value, true);
                        }}>
                    </input>
                    {searchListUser ?
                        <div className="list-group  list-group-pos col-12">
                            {usersFilter.map((user) => {
                                return (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        id={user.id}
                                        key={user.id}
                                        onClick={(e) => {
                                            setForm({ ...form, employee: { id: user.id, userName: user.userName } })
                                            setSearchListUser(false)
                                        }}
                                    >
                                        {user.userName}
                                    </button>
                                )
                            })}
                        </div>
                        : ""
                    }
                </div>
                <div className="form-group col-6">
                    <label>Приоритет</label>
                    <div className="d-flex">
                        <input type="input" className="form-control" id="prioDir" readOnly={true}
                            value={form.priority.priorityName}
                            onFocus={(e) => {
                                if (priority.length < 1) { getPriority(); }
                            }}
                            onClick={e => {
                                setListPriority(!listPriority);
                                setToggle(!toggle)
                            }}
                            onChange={(e) => {
                                setForm({ ...form, priority: { id: "", priorityName: e.target.value } });
                            }}>
                        </input>
                        <CaretDownFill className={toggle ? "toggle-arrow" : "toggle-arrow-active"} />
                    </div>
                    {listPriority ?
                        <div className="list-group list-group-pos col-12">
                            {priority.map((item) => {
                                return (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        id={item.id}
                                        key={item.id}
                                        onClick={(e) => {
                                            setForm({ ...form, priority: { id: item.id, priorityName: item.priorityName } })
                                            setListPriority(false)
                                        }}
                                    >
                                        {item.priorityName}
                                    </button>
                                )
                            })}
                        </div>
                        : ""
                    }
                </div>
                <div className="form-group col-5">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" multiple={true}
                            onChange={e => {
                                setForm({ ...form, files: prepareSubTaskFiles(e) })
                            }}
                        >
                        </input>
                        <label class="custom-file-label" for="customFile">Выбирите файл</label>
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