import { useState } from "react";
import { CaretDownFill, XCircleFill } from 'react-bootstrap-icons';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import { DetailSubTaskCreate } from "../detailTask/detailTask"
import "./form.scss";
import { Form } from "react-bootstrap";

export const TaskForm = (props) => {
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const userId = useSelector((state) => state.auth.userId);
    const [showDetail, setShowDetail] = useState(false)
    const [selectedSubTaskId, setSelectedSubTaskId] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [usersFilter, setUsersFilter] = useState([]);
    const [searchListUser, setSearchListUser] = useState(false);
    const [listPriority, setListPriority] = useState(false);
    const dispatch = useDispatch();
    const form = {
        taskName: "",
        taskDesc: "",
        begDate: "",
        endDate: "",
        priority: { id: "", priorityName: "" },
        employee: { id: "", userName: "" },
        files: "",
        status: 1,
        author: userId,
        parentId: null
    }

    const [files, setFiles] = useState(null);

    const sendFile = async (taskId) => {

        const formData = new FormData();
        console.log(files)
        formData.append('file', files)
        formData.append('taskId', taskId)
        const headers = { 'Access-Control-Allow-Credentials': 'true' }
        await request("http://127.0.0.1:8080/uploadFile", "POST", formData, headers)
    }
    const VisibleSubTaskFrom = (e) => {
        e.preventDefault();
        dispatch(taskAtions.setVisible({ visible: true }));
    }

    const sendForm = async () => {
        const parenTask = { ...task.task };
        parenTask.priority = task.task.priority.id;
        parenTask.employee = task.task.employee.id;
        const id = await request("http://127.0.0.1:8080/addTask", "POST", JSON.stringify({ ...parenTask }))
        if (files) {
            sendFile(id)
        }
        dispatch(taskAtions.setTask(form));
        task.subTask.forEach(subTask => {
            subTask.parent = id;
            subTask.priority = task.task.priority.id;
            subTask.employee = task.task.employee.id;
        });
        const subTask = await request("http://127.0.0.1:8080/addSubtask", "POST", JSON.stringify(task.subTask))
        
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


    const SubTask = (props) => {
        const deleteSubTask = (id) => {
            let newSubTaskArray = task.subTask;
            newSubTaskArray.splice(id, 1)
            dispatch(taskAtions.setSubTask(newSubTaskArray));
        }

        return (
            <div>
                <div className="d-flex subtask-info m-1">
                    <div>
                        <button type="button"
                            onClick={e => {
                                setShowDetail(true);
                                setSelectedSubTaskId(props.id)
                            }}>
                            <span>{task.subTask[props.id].taskName}</span>
                        </button>
                    </div>
                    <div>
                        <button onClick={e => deleteSubTask(props.id)}>
                            <XCircleFill />
                        </button>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="taskForm">
            <div>
                <h1>Новая задача</h1>
            </div>

            <form className="d-flex row">
                <div className="form-group col-6">
                    <label>Название</label>
                    <input type="value" className="form-control" id="nameOfTask" placeholder="" value={task.task.taskName} onChange={(e) => cacheTaskForm(e, { ...task.task, taskName: e.target.value })}></input>
                </div>
                <div className="form-group col-12">
                    <label>Описание</label>
                    <textarea className="form-control" id="descOfTask" value={task.task.taskDesc} onChange={e => cacheTaskForm(e, { ...task.task, taskDesc: e.target.value })}></textarea>
                </div>
                <div className="form-group col-6">
                    <label>Дата начала:</label>
                    <input type="date" className="form-control" id="begdate" value={task.task.begDate} onChange={(e) => cacheTaskForm(e, { ...task.task, begDate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Дата окончания:</label>
                    <input type="date" className="form-control" id="expdate" value={task.task.endDate} onChange={(e) => cacheTaskForm(e, { ...task.task, endDate: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Назначена:</label>
                    <input type="input" className="form-control" id="expdate"
                        value={task.task.employee.userName}
                        onFocus={(e) => searchListUserVisible(e.target.value, true)}
                        onChange={(e) => {
                            if (users.length < 1) { getUsers(); }
                            cacheTaskForm(e, { ...task.task, employee: { id: "", userName: e.target.value } });
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
                                            cacheTaskForm(e, { ...task.task, employee: { id: user.id, userName: user.userName } })
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
                            value={task.task.priority.priorityName}
                            onFocus={(e) => {
                                if (priority.length < 1) { getPriority(); }
                            }}
                            onClick={e => {
                                setListPriority(!listPriority);
                                setToggle(!toggle)
                            }}
                            onChange={(e) => {
                                cacheTaskForm(e, { ...task.task, priority: { id: "", priorityName: e.target.value } });
                            }}
                        >
                        </input><CaretDownFill className={toggle ? "toggle-arrow" : "toggle-arrow-active"} />
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
                                            setToggle(false)
                                            cacheTaskForm(e, { ...task.task, priority: { id: item.id, priorityName: item.priorityName } })
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
                <div className="form-group col-3">
                    <button type="button" className="btn btn-secondary"
                        onClick={e => VisibleSubTaskFrom(e)} >Добавить подзадачу
                    </button>
                </div>
                <div className="col-9 d-flex row">
                    {
                        task.subTask.map((item, index) => {
                            return (<SubTask key={index} id={index} />)
                        })
                    }
                </div>
                <div className="form-group col-6">
                    <label htmlFor="file">Прикрепить документы</label>
                    <input type="file" className="form-control-file" id="file" name="file" value={task.task.files} onChange={e => {
                        cacheTaskForm(e, { ...task.task, files: e.target.value })
                        setFiles(e.target.files[0]);
                    }}></input>
                </div>
                <div className="form-group col-12">
                    <button type="button" className="btn btn-secondary" onClick={e => saveTask(e)} >Создать задачу</button>
                </div>
            </form>
            <div className="detail-task-window">
                {showDetail ? <DetailSubTaskCreate
                    data={task.subTask[selectedSubTaskId]}
                    show={showDetail} onHide={() => setShowDetail(false)}
                /> : ""}
            </div>
        </div >

    )
}

