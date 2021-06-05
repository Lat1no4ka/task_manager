import "./detail.scss";
import { useHttp } from "../../hooks/http.hook";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DetailTask as DetailSubTask } from "./detailTask"
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useForm } from "react-hook-form";

export const DetailSubTaskCreate = (props) => {
  const data = props.data;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{data.taskName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h4>Описание: {data.taskDesc}</h4>
        </div>
        <div>
          <p className="desc">Дата начала: {data.begDate}</p>
        </div>
        <div>
          <p className="desc">Дата окончания: {data.endDate}</p>
        </div>
        <div>
          <p className="desc">Исполнитель: {data.employee.firstName} {data.employee.lastName}</p>
        </div>
        <div>
          <p className="desc">Приоритет: {data.priority.priorityName}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const DetailTask = (props) => {
  const [data, setData] = useState(props.data);
  const { request } = useHttp();
  const [subTasks, setSubTasks] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedSubTaskId, setSelectedSubTaskId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [priority, setPriority] = useState([]);
  const [nextStatus, setNextStatus] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [file, setFile] = useState(null)
  const [showAddSubTask, setShowAddSubTask] = useState(false);
  const [form, setForm] = useState({
    id: data.id,
    taskName: data.taskName,
    taskDesc: data.taskDesc,
    begDate: data.begDate,
    endDate: data.endDate,
    priority: data.priority,
    employee: data.employee,
    files: data.files,
    status: data.status,
    author: data.author,
  })

  useEffect(() => {
    getSubTasks();
    selectNextStatus();
  }, [form.status, file])

  useEffect(() => {
    if (!users.length)
      getUsers()
    if (!priority.length)
      getPriority()
  }, [users, priority])

  const getFile = async (index, fileName) => {

    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/downloadFile`, { method: "POST", body: JSON.stringify(data.files[index]), headers })
      .then(res => res.blob())
      .then(blob => {
        downloadFile(blob, fileName)
      })

  };

  const downloadFile = (file, fileName) => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  const getPriority = async () => {
    const priority = await request(`${process.env.REACT_APP_API_URL}/getPriority`, "GET");
    setPriority(priority);
  }

  const getUsers = async () => {
    const response = await request(`${process.env.REACT_APP_API_URL}/allUsers`, "GET");
    const users = await response.map(user => {
      return { id: user.id, name: user.userName }
    })
    setUsers(users);
  }

  const getSubTasks = async () => {
    const subTasks = await request(`${process.env.REACT_APP_API_URL}/getSubtasks`, "POST", JSON.stringify({ id: data.id }))
    setSubTasks(subTasks);
  };
  const saveEdit = async (status) => {
    let update = { ...form };
    console.log(status)
    update.priority = update.priority.id
    status ? update.status = status.id : update.status = update.status.id
    update.author = update.author.id
    update.employee = update.employee.id
    await request(`${process.env.REACT_APP_API_URL}/alterTask`, "POST", JSON.stringify({ ...update }))
    setData({ ...form })
    setEdit(false)
  }

  const SubTask = (props) => {
    return (
      <div>
        <div className="d-flex subtask-info m-1">
          <div>
            <button type="button"
              onClick={e => {
                setShowDetail(true);
                setSelectedSubTaskId(props.id)
              }}>
              <span>{subTasks[props.id].taskName}</span>
            </button>
          </div>
        </div>
      </div>

    )
  }

  const selectNextStatus = async () => {
    const status = await request(`${process.env.REACT_APP_API_URL}/getStatus`, "GET");
    let next = null;
    switch (form.status.alias) {
      case "new":
        next = status.filter(item => {
          return item.alias === 'work' || item.alias == "closed" ? item : null;
        })
        setNextStatus(next)
        break
      case "work":
        next = status.filter(item => {
          return item.alias === "check" || item.alias == 'closed' ? item : null;
        })
        setNextStatus(next)
        break
      case "check":
        next = status.filter(item => {
          return item.alias === "revision" || item.alias == 'accepted' ? item : null;
        })
        setNextStatus(next)
        break
      case "revision":
        next = status.filter(item => {
          return item.alias === "accepted" || item.alias == 'closed' ? item : null;
        })
        setNextStatus(next)
        break
      case "accepted":
        next = status.filter(item => {
          return item.alias == 'closed' ? item : null;
        })
        setNextStatus(next)
        break

      default:
        next = status.filter(item => {
          return null;
        })
        setNextStatus(next)
        break
    }
  }

  if (!showDetail && !showAddSubTask) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between row w-100">
            <Modal.Title className="col-6">
              {
                edit ?
                  <div className="col-12">
                    <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskName} onChange={(e) => setForm({ ...form, taskName: e.target.value })}></input></div>
                  : data.taskName
              }
            </Modal.Title>
            <Modal.Title className="col-6">
              {
                edit ? "" :
                  nextStatus ?
                    <div>
                      {nextStatus[0] ?
                        <button type="button" className="btn btn-secondary m-1"
                          onClick={(e) => { setForm({ ...form, status: nextStatus[0] }); saveEdit(nextStatus[0]) }}>
                          {nextStatus[0]?.statusName}
                        </button> : null
                      }
                      {nextStatus[1] ?
                        <button type="button" className="btn btn-secondary m-1"
                          onClick={(e) => { setForm({ ...form, status: nextStatus[1] }); saveEdit(nextStatus[1]) }}
                        >
                          {nextStatus[1]?.statusName}
                        </button> : null
                      }
                    </div>
                    : ""
              }
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row ">
          <div className="d-flex flex-column w-100">
            <div>
              {edit ? "" : <p className="desc">Статус: <span>{form.status.statusName}</span></p>}
            </div>
            <div>
              {
                edit ?
                  <div className="m-1 col-12 desc_task">
                    <textarea type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskDesc} onChange={(e) => setForm({ ...form, taskDesc: e.target.value })}></textarea>
                  </div>
                  : <p className="desc">Описание: <span>{data.taskDesc}</span></p>
              }
            </div>
            <div>
              {
                edit ?
                  <div className="m-1 col-6">
                    <input type="date" className="form-control" id="nameOfTask" placeholder="" value={form.begDate} onChange={(e) => setForm({ ...form, begDate: e.target.value })}></input>
                  </div>
                  : <p className="desc">Дата начала: <span>{data.begDate}</span></p>
              }
            </div>
            <div>
              {
                edit ?
                  <div className="m-1 col-6">
                    <input type="date" className="form-control" id="nameOfTask" placeholder="" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}></input>
                  </div>
                  : <p className="desc">Дата окончания: <span>{data.endDate}</span></p>
              }
            </div>
            <div>
              {console.log(data)}
              {
                edit ?
                  <div className="m-1 col-6">
                    <Typeahead
                      clearButton
                      labelKey="name"
                      id="selections-example"
                      defaultSelected={[{ id: data.employee.id ?? "", name: data.employee.userName ?? "" }]}
                      onChange={(user, e) => { setForm({ ...form, employee: [{ id: user[0]?.id, userName: user[0]?.name }] }) }}
                      options={users.length ? users : []}
                      placeholder="Назначить на"
                    />
                  </div>
                  : <>
                    {data.employee.map((user) => {
                      return <p className="desc">Исполнитель: <span>{user.firstName} {user.lastName}</span></p>
                    })}
                  </>
              }
            </div>
            <div>
              {
                edit ? "" : <p className="desc">Автор: <span>{data.author.firstName + " " + data.author.lastName}</span></p>
              }
            </div>
            <div>
              {edit ?
                <div className="m-1 col-6">
                  <select className="custom-select" id="inputGroupSelect01"
                    onClick={e => setForm({ ...form, priority: { id: e.target.value, priorityName: e.target.options[e.target.options.selectedIndex]?.text } })}>
                    <option hidden value={data.priority.id}>{data.priority.priorityName}</option>
                    {
                      priority.length ?
                        priority.map((item) => {
                          return <option key={item.id} value={item.id}>{item.priorityName}</option>
                        }) : null
                    }
                  </select>

                </div>
                : <p className="desc">Приоритет: <span>{data.priority.priorityName}</span></p>
              }
              <div>
                {
                  edit ? "" :
                    data.files ?
                      data.files.map((file, index) => {
                        return <div className="files"> <a href="#" key={file.id} onClick={e => { getFile(index, file.fileName) }}>{file.fileName} </a> </div>
                      })
                      : ""
                }
              </div>
              {edit ? null :
                <div className="">
                  {subTasks.length > 0 ?
                    subTasks.map((item, index) => {
                      return (<SubTask key={index} id={index} />)
                    }) : null
                  }
                </div>
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex modal-foter">
          <div className="col-12">
            {data.author.id == userId ?
              <div>
                {
                  edit ?
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <button type="button" className="btn btn-secondary" onClick={e => saveEdit()} >Сохранить</button>
                      </div>
                      <div className="">
                        <button type="button" className="btn btn-secondary" onClick={e => setEdit(!edit)} >Отмена</button>
                      </div>
                    </div>
                    :
                    <div className="d-flex justify-content-between">
                      <div>
                        <button type="button" className="btn btn-secondary mr-2" onClick={e => setEdit(!edit)} >Редактировать</button>
                        {!edit ? <button type="button" className="btn btn-secondary" onClick={e => { setShowAddSubTask(true); console.log(showAddSubTask) }}>Добавить подзадачу</button> : null}
                      </div>
                      <div>

                      </div>
                    </div>
                }
              </div>
              : null
            }
          </div>
        </Modal.Footer>
      </Modal>
    );
  } else if (showAddSubTask) {
    return (
      <AddSubTask
        show={showAddSubTask} onHide={() => setShowAddSubTask(false)} parent={data.id}
      />
    )
  }
  else {
    return (
      <div className="detail-task-window">
        <DetailSubTask
          data={subTasks[selectedSubTaskId]}
          show={showDetail} onHide={() => setShowDetail(false)}
        />
      </div>
    )
  }
};



export const AddSubTask = (props) => {
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
  const date = new Date();
  const userId = useSelector((state) => state.auth.userId);
  const [users, setUsers] = useState([]);
  const { request } = useHttp();
  const [priority, setPriority] = useState([]);
  const [subTaskFile, setSubTaskFile] = useState([]);
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
      parent: props.parent
    }
  );

  useEffect(() => {
    getUsers();
    getPriority();
  }, [])


  const getPriority = async () => {
    const priority = await request(`${process.env.REACT_APP_API_URL}/getPriority`, "GET");
    setPriority(priority);
  }

  const getUsers = async () => {
    const response = await request(`${process.env.REACT_APP_API_URL}/allUsers`, "GET");
    const users = await response.map(user => {
      return { id: user.id, name: user.userName }
    })
    setUsers(users);
  }
  const prepareSubTaskFiles = (e) => {
    form.files.push(...e.target.files)
    subTaskFile.push(...e.target.files)
    setSubTaskFile(subTaskFile);
    return form.files
  }
  const addSubTask = async (e, data) => {
    let parseForm = { ...form };
    parseForm.priority = parseForm.priority.id
    const subTask = await request(`${process.env.REACT_APP_API_URL}/addTask`, "POST", JSON.stringify(parseForm))
    const id = await subTask.id;
    if (subTaskFile.length > 0) {
      sendFile(id);
    }
  }

  const sendFile = async (taskId) => {
    const formData = new FormData();
    subTaskFile.forEach(file => {
      formData.append('file', file)
    });
    formData.append('taskId', taskId)
    const headers = { 'Access-Control-Allow-Credentials': 'true' }
    await request(`${process.env.REACT_APP_API_URL}/uploadFiles`, "POST", formData, headers)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить подзадачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              multiple
              labelKey="name"
              id="selections-example"
              {...register("subEmployerRequired", { required: true })}
              onChange={(user) => {
                setForm({ ...form, employee: [{ id: user[0]?.id, userName: user[0]?.name }] });
                setValue('subEmployerRequired', user);
                clearErrors("subEmployerRequired")
              }}
              options={users.length ? users : []}
              placeholder="Назначить на"
            />
            {errors.subEmployerRequired && <span className="error">Назначьте исполнителя</span>}
          </div>
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
                return <p className="m-2" key={index}>{file.name}</p>
              })}
            </div>
          </div>
          <div className="d-flex col-12 justify-content-between">
            <div className="form-group">
              <input type="submit" className="btn btn-secondary" value="Добавить" />
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-secondary" onClick={(e) => props.onHide(false)}>Отмена</button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}