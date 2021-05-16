import { useState, useEffect, useRef } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { CaretDownFill, XCircleFill } from 'react-bootstrap-icons';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import { DetailSubTaskCreate } from "../detailTask/detailTask"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./form.scss";

export const TaskForm = (props) => {
    const ref = useRef(null);
    const refSelected = useRef(null);
    const { request, error } = useHttp();
    const task = useSelector((state) => state.task);
    const userId = useSelector((state) => state.auth.userId);
    const [showDetail, setShowDetail] = useState(false)
    const [selectedSubTaskId, setSelectedSubTaskId] = useState(false)
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const form = {
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

    useEffect(() => {
        if (!users.length)
            getUsers()
        if (!priority.length)
            getPriority()
    }, [users, priority])

    const sendFile = async (taskId, propFiles) => {
        const formData = new FormData();
        propFiles.forEach(file => {
            formData.append('file', file)
        });
        formData.append('taskId', taskId)
        const headers = { 'Access-Control-Allow-Credentials': 'true' }
        await request(`${process.env.REACT_APP_API_URL}/uploadFiles`, "POST", formData, headers)
    }


    const VisibleSubTaskFrom = (e) => {
        e.preventDefault();
        dispatch(taskAtions.setVisible({ visible: true }));
    }

    const sendForm = async () => {
        const parenTask = { ...task.task };
        parenTask.priority = task.task.priority.id;
        parenTask.employee = task.task.employee.id;

        const id = await request(`${process.env.REACT_APP_API_URL}/addTask`, "POST", JSON.stringify({ ...parenTask }))

        if (task.task.files.length > 0) {
            sendFile(id, task.task.files)
        }

        dispatch(taskAtions.setTask(form));

        task.subTask.forEach(subTask => {
            subTask.parent = id;
            subTask.priority = subTask.priority.id;
            subTask.employee = subTask.employee.id;
        });

        const subTask = await request(`${process.env.REACT_APP_API_URL}/addSubtask`, "POST", JSON.stringify(task.subTask))

        if (task.subTaskFile.length > 0) {
            subTask.forEach((item, index) => {
                sendFile(item.id, task.subTaskFile[index])
            })
        }
        setSuccess(true)
        setTimeout(showSuccess, 3000)
    };

    const showSuccess = () => {
        setSuccess(false)
    }

    const cacheTaskForm = (e, param) => {
        dispatch(taskAtions.setTask(param))
    }

    const prepareTaskFiles = (e) => {
        task.task.files.push(...e.target.files)
        return task.task.files
    }

    const saveTask = (e) => {
        e.preventDefault();
        sendForm();
        ref.current.clear()
        refSelected.current.value = "";
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
                {console.log(success)}
                {success ? <h1>Задача успешно создана</h1> :
                    <h1>Новая задача</h1>
                }
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
                    <Typeahead
                        clearButton
                        labelKey="name"
                        id="selections-example"
                        defaultSelected={[{ id: task.task.employee.id ?? "", name: task.task.employee.userName ?? "" }]}
                        onChange={(user, e) => { cacheTaskForm(e, { ...task.task, employee: { id: user[0]?.id, userName: user[0]?.name } }) }}
                        options={users.length ? users : []}
                        placeholder="Назначить на"
                        ref={ref}
                    />
                </div>
                <div className="form-group col-6" >
                    <label>Приоритет</label>
                    <select className="custom-select" id="inputGroupSelect01" ref={refSelected}
                        onClick={e => cacheTaskForm(e, { ...task.task, priority: { id: e.target.value, priorityName: e.target.options[e.target.options.selectedIndex]?.text } })}>
                        <option hidden value={task.task.priority.id}>{task.task.priority.priorityName}</option>
                        {
                            priority.length ?
                                priority.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.priorityName}</option>
                                }) : null
                        }
                    </select>
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
                <div className="form-group col-4">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" multiple={true}
                            onChange={e => {
                                cacheTaskForm(e, { ...task.task, files: prepareTaskFiles(e) })
                            }}
                        >
                        </input>
                        <label className="custom-file-label">Выберите файл</label>
                    </div>
                    <div>
                        {task.task.files.map((file, index) => {
                            return <p className="m-2" key={index}>{file.name}</p>
                        })}
                    </div>
                    <div>
                        {task.task.files.map((file, index) => {
                            return <p className="m-2" key={index}>{file.name}</p>
                        })}
                    </div>
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

