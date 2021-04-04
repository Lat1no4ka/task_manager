import { useState } from "react";
import { CaretDownFill } from 'react-bootstrap-icons';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import "./form.scss";

export const TaskForm = (props) => {
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const [toggle, setToggle] = useState(false);
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [usersFilter, setUsersFilter] = useState([]);
    const [searchListUser, setSearchListUser] = useState(false);
    const [listPriority, setListPriority] = useState(false);
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
                    <label>Назначена:</label>
                    <input type="input" className="form-control" id="expdate"
                        value={task.task.executor.userName}
                        onFocus={(e) => searchListUserVisible(e.target.value, true)}
                        onChange={(e) => {
                            if (users.length < 1) { getUsers(); }
                            cacheTaskForm(e, { ...task.task, executor: { id: "", userName: e.target.value } });
                            searchListUserVisible(e.target.value, true);
                        }}>
                    </input>
                    {searchListUser ?
                        <div className="list-group list-group-pos col-12">
                            {usersFilter.map((user) => {
                                return (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        id={user.id}
                                        key={user.id}
                                        onClick={(e) => {
                                            cacheTaskForm(e, { ...task.task, executor: { id: user.id, userName: user.userName } })
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
                <div className="form-group col-6" >
                    <label htmlFor="select">Приоритет</label>
                    <div className="d-flex">
                        <input type="input" className="form-control priotity-style" id="prioDir" readOnly={true}
                            value={task.task.prioDir.prioname}
                            onFocus={(e) => {
                                if (priority.length < 1) { getPriority(); }
                            }}
                            onClick={e => {
                                setListPriority(!listPriority);
                                setToggle(!toggle)
                            }}
                            onChange={(e) => {
                                cacheTaskForm(e, { ...task.task, prioDir: { id: "", prioDir: e.target.value } });
                            }}
                        >
                        </input><CaretDownFill className={toggle ? "toggle-arrow" : "toggle-arrow-active"} /></div>
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
                                            setToggle(false)
                                            cacheTaskForm(e, { ...task.task, prioDir: { id: item.id, prioname: item.prioname } })
                                            setListPriority(false)
                                        }}
                                    >
                                        {item.prioname}
                                    </button>
                                )
                            })}
                        </div>
                        : ""
                    }
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

