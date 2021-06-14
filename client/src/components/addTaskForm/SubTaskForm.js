import { useState, useEffect } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { taskAtions } from "../../redux/task/action";
import { useForm, Controller } from "react-hook-form";
import { FileCheck } from 'react-bootstrap-icons';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./form.scss";

export const SubTask = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const task = useSelector((state) => state.task);
    const userId = useSelector((state) => state.auth.userId);
    const [users, setUsers] = useState([]);
    const [priority, setPriority] = useState([]);
    const date = new Date();
    const [form, setForm] = useState(
        {
            taskName: "",
            taskDesc: "",
            begDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`,
            endDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`,
            priority: { id: "", priorityName: "" },
            employee: { id: "", userName: "" },
            files: [],
            status: 1,
            author: userId,
            parentId: null
        }
    );

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();


    useEffect(() => {
        if (!users.length)
            getUsers()
        if (!priority.length)
            getPriority()
    }, [users, priority])


    const addSubTask = (e, data) => {
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

            <form className="d-flex row" onSubmit={handleSubmit(addSubTask)}>
                <div className="form-group col-6 title">
                    <label>Название</label>
                    <input type="value" className={errors.subTitleRequired ? "form-control error" : "form-control"} id="nameOfTask" placeholder=""
                        {...register("subTitleRequired", { required: true })}
                        value={form.taskName} onChange={(e) => { setForm({ ...form, taskName: e.target.value }); clearErrors("subTitleRequired") }}></input>
                    {errors.subTitleRequired && <span className="error">Введите название</span>}
                </div>
                <div className="form-group col-12 desc_task">
                    <label>Описание</label>
                    <textarea className="form-control" id="descOfTask" value={form.taskDesc} onChange={e => setForm({ ...form, taskDesc: e.target.value })}></textarea>
                </div>
                <div className="form-group col-6 other_inputs">
                    <label>Дата начала:</label>
                    <input type="date" className={errors.subStartDateRequired ? "form-control error" : "form-control"}
                        {...register("subStartDateRequired", { required: true })}
                        id="begdate" value={form.begDate} onChange={(e) => { setForm({ ...form, begDate: e.target.value }); clearErrors("subStartDateRequired") }}></input>
                    {errors.subStartDateRequired && <span className="error">Введите дату начала</span>}
                </div>
                <div className="form-group col-6 other_inputs">
                    <label>Дата окончания:</label>
                    <input type="date" className={errors.subEndDateRequired ? "form-control error" : "form-control"} id="expdate"
                        {...register("subEndDateRequired", { required: true })}
                        value={form.endDate} onChange={(e) => { setForm({ ...form, endDate: e.target.value }); clearErrors("subEndDateRequired") }}></input>
                    {errors.subEndDateRequired && <span className="error">Введите дату окончания</span>}
                </div>
                <div className="form-group col-6 other_inputs">
                    <label>Назначена:</label>
                    <Typeahead
                        className={errors.subEmployerRequired && "error-input"}
                        clearButton
                        labelKey="name"
                        multiple
                        id="selections-example"
                        {...register("subEmployerRequired", { required: true })}
                        onChange={(user) => {
                            setForm({ ...form, employee: user });
                            setValue('subEmployerRequired', user[0]?.id);
                            clearErrors("subEmployerRequired")
                        }}
                        options={users.length ? users : []}
                        placeholder="Назначить на"
                    />
                    {errors.subEmployerRequired && <span className="error">Назначьте исполнителя</span>}
                </div>
                {console.log(form)}
                <div className="form-group col-6 other_inputs" >
                    <label>Приоритет</label>
                    <select className={errors.subPriorityRequired ? "custom-select error" : "custom-select"} id="inputGroupSelect01"
                        {...register("subPriorityRequired", { required: true })}
                        onClick={e => setForm({ ...form, priority: { id: e.target.value, priorityName: e.target.options[e.target.options.selectedIndex]?.text } })}>
                        <option hidden value={null}></option>
                        {
                            priority.length ?
                                priority.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.priorityName}</option>
                                }) : null
                        }
                    </select>
                    {errors.subPriorityRequired && <span className="error">Выбирите приоритет</span>}
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
                            return <p className="m-2 file" key={index}><FileCheck size={25} className="mr-1" />{file.name}</p>
                        })}
                    </div>
                </div>
                <div className="form-group col-2">
                    <input type="submit" className="btn btn-secondary" value="Добавить" />
                </div>
                <div className="form-group col-2">
                    <button type="button" className="btn btn-secondary" onClick={(e) => cancel(e)}>Отмена</button>
                </div>
            </form>
        </div>
    )
}