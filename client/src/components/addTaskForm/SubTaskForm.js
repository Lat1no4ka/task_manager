import { useState } from "react";
import "./form.scss";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
export const SubTask = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [usersFilter, setUsersFilter] = useState([]);
    const [searchListUser, setSearchListUser] = useState(false);
    const [listPriority, setListPriority] = useState(false);
    const [form, setForm] = useState(
        {
            taskname: "",
            taskdesc: "",
            begdate: "",
            expdate: "",
            prioDir: { id: "", prioname: "" },
            executor: { id: "", userName: "" },
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
        <div className="subTaskForm">
            {console.log(form)}
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
                    <label>Назначена:</label>
                    <input type="input" className="form-control" id="expdate"
                        value={form.executor.userName}
                        onFocus={
                            (e) => {
                                searchListUserVisible(e.target.value, true);
                                console.log(form)
                            }

                        }
                        onChange={(e) => {
                            if (users.length < 1) { getUsers(); }
                            setForm({ ...form, executor: { id: "", userName: e.target.value } });
                            searchListUserVisible(e.target.value, true);
                        }}>
                    </input>
                    {searchListUser ?
                        <div className="list-group">
                            {usersFilter.map((user) => {
                                return (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        id={user.id}
                                        key={user.id}
                                        onClick={(e) => {
                                            setForm({ ...form, executor: { id: user.id, userName: user.userName } })
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
                    <label htmlFor="select">Приоритет</label>
                    <input type="input" className="form-control" id="prioDir" readOnly={true}
                        value={form.prioDir.prioname}
                        onFocus={(e) => {
                            setListPriority(true);
                            if (priority.length < 1) { getPriority(); }
                        }}
                        onChange={(e) => {
                            setForm({ ...form, prioDir: { id: "", prioDir: e.target.value } });
                        }}>
                    </input>
                    {listPriority ?
                        <div className="list-group">
                            {priority.map((item) => {
                                return (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        id={item.id}
                                        key={item.id}
                                        onClick={(e) => {
                                            setForm({ ...form, prioDir: { id: item.id, prioname: item.prioname } })
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