import { useState, useEffect, useRef } from "react";
import { XCircleFill } from 'react-bootstrap-icons';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import { DetailSubTaskCreate } from "../detailTask/detailTask"
import { FileCheck } from 'react-bootstrap-icons';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useForm } from "react-hook-form";
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
        authorId: userId,
        parentId: null
    }

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, reset } = useForm();

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
        parenTask.employee = task.task.employee;

        const newTask = await request(`${process.env.REACT_APP_API_URL}/addTask`, "POST", JSON.stringify({ ...parenTask }))

        if (task.task.files.length > 0) {
            sendFile(newTask.id, task.task.files)
        }

        dispatch(taskAtions.setTask(form));

        request(`${process.env.REACT_APP_API_URL}/sendMessage`, "POST", JSON.stringify({ id: newTask.id }))
        task.subTask.forEach(subTask => {
            subTask.parent = newTask.id;
            subTask.parentId = newTask.id;
            subTask.priority = subTask.priority.id;
            subTask.employee = subTask.employee.map((sub) => {
                return { id: sub.id, userName: sub.name }
            });
        });

        const subTask = await request(`${process.env.REACT_APP_API_URL}/addSubtask`, "POST", JSON.stringify(task.subTask))

        if (task.subTaskFile.length > 0) {
            subTask.forEach((item, index) => {
                sendFile(item.id, task.subTaskFile[index])
            })
        }
        setSuccess(true)
        setTimeout(showSuccess, 2000)
    };

    const showSuccess = () => {
        window.location.reload();
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

        sendForm();
        ref.current.clear()
        reset("priorityRequired")
        refSelected.current.value = "";
        dispatch(taskAtions.setSubTask([]));
    }

    const getUsers = async () => {
        const response = await request(`${process.env.REACT_APP_API_URL}/allUsers`, "GET");
        const users = await response.map(user => {
            return { id: user.id, name: `${user.lastName} ${user.firstName}` }
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
                        <button className="p-0" onClick={e => deleteSubTask(props.id)}>
                            <XCircleFill className="p-0" />
                        </button>
                    </div>
                </div>
            </div>

        )
    }


    return (
        <div className="taskForm">
            <div>
                {success ? <h1>Задача успешно создана</h1> :
                    <h1>Новая задача</h1>
                }
            </div>

            <form className="d-flex row" onSubmit={handleSubmit(saveTask)}>
                <div className="form-group col-6 title">
                    <label>Название</label>
                    <input type="value" className={errors.titleRequired ? "form-control error" : "form-control"} id="nameOfTask" placeholder=""
                        {...register("titleRequired", { required: true })}
                        value={task.task.taskName} onChange={(e) => { cacheTaskForm(e, { ...task.task, taskName: e.target.value }); clearErrors("titleRequired") }}>
                    </input>
                    {errors.titleRequired && <span className="error">Введите название задачи</span>}
                </div>
                <div className="form-group col-12 desc_task">
                    <label>Описание</label>
                    <textarea className="form-control" id="descOfTask" value={task.task.taskDesc} onChange={e => cacheTaskForm(e, { ...task.task, taskDesc: e.target.value })}></textarea>
                </div>
                <div className="form-group col-6 other_inputs">
                    <label>Дата начала:</label>
                    <input type="date" className={errors.startDateRequired ? "form-control error" : "form-control"} id="begdate" {...register("startDateRequired", { required: true })}
                        value={task.task.begDate} onChange={(e) => { cacheTaskForm(e, { ...task.task, begDate: e.target.value }); clearErrors("startDateRequired") }}></input>
                    {errors.startDateRequired && <span className="error">Введите дату начала</span>}
                </div>
                <div className="form-group col-6 other_inputs">
                    <label>Дата окончания:</label>
                    <input type="date" className={errors.endDateRequired ? "form-control error" : "form-control"} id="expdate" {...register("endDateRequired", { required: true })}
                        value={task.task.endDate} onChange={(e) => { cacheTaskForm(e, { ...task.task, endDate: e.target.value }); clearErrors("endDateRequired") }}></input>
                    {errors.endDateRequired && <span className="error">Введите дату окончания</span>}
                </div>
                <div className="form-group col-6 other_inputs">
                    <label>Назначена:</label>
                    {task.task.employee[0]?.id ? setValue('employerRequired', task.task.employee[0].id) : null}
                    <Typeahead
                        className={errors.employerRequired ? "error-input" : ""}
                        {...register("employerRequired", { required: true })}
                        clearButton
                        labelKey="name"
                        defaultSelected={task.task.employee[0]?.id ? [{ id: task.task.employee[0].id, name: task.task.employee[0].userName }] : []}
                        id="selections-example"
                        onChange={(user, e) => {
                            cacheTaskForm(e, { ...task.task, employee: [{ id: user[0]?.id, userName: user[0]?.name }] });
                            setValue('employerRequired', user[0]?.id)
                            clearErrors("employerRequired")
                        }}
                        options={users.length ? users : []}
                        placeholder="Назначить на"
                        ref={ref}
                    />
                    {errors.employerRequired && <span className="error">Назначьте исполнителя</span>}
                </div>
                <div className="form-group col-6 other_inputs" >
                    <label>Приоритет</label>
                    <select className={errors.priorityRequired ? "custom-select error" : "custom-select"} id="inputGroupSelect01" ref={refSelected}
                        {...register("priorityRequired", { required: true })}
                        onClick={e => cacheTaskForm(e, { ...task.task, priority: { id: e.target.value, priorityName: e.target.options[e.target.options.selectedIndex]?.text } })}>
                        <option hidden value={task.task.priority.id}>{task.task.priority.priorityName}</option>
                        {
                            priority.length ?
                                priority.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.priorityName}</option>
                                }) : null
                        }
                    </select>
                    {errors.priorityRequired && <span className="error">Выбирите приоритет</span>}
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
                            return <p className="m-2 file" key={index}> <FileCheck size={25} className="mr-1" />{file.name}</p>
                        })}
                    </div>
                </div>
                <div className="form-group col-12">
                    <input type="submit" className="btn btn-secondary" value="Создать задачу" />
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

