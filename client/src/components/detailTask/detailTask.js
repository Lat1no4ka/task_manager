import "./detail.scss";
import { useHttp } from "../../hooks/http.hook";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DetailTask as DetailSubTask } from "./detailTask"
import { CaretDownFill, XCircleFill } from 'react-bootstrap-icons';

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
          <p>Дата начала: {data.begDate}</p>
        </div>
        <div>
          <p>Дата окончания: {data.endDate}</p>
        </div>
        <div>
          <p>Исполнитель: {data.employee.userName}</p>
        </div>
        <div>
          <p>Приоритет: {data.priority.priorityName}</p>
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
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [priority, setPriority] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [searchListUser, setSearchListUser] = useState(false);
  const [listPriority, setListPriority] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [file, setFile] = useState(null)
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
  }, [form.status,file])

  const getFile = async (index,fileName) => {

    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    const response = await fetch("http://127.0.0.1:8080/downloadFile", { method: "POST", body: JSON.stringify(data.files[index]), headers })
      .then(res => res.blob())
      .then(blob => {
        downloadFile(blob,fileName)
      })

  };

  const downloadFile = (file,fileName) => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  const getPriority = async () => {
    const priority = await request("http://127.0.0.1:8080/getPriority", "GET");
    setPriority(priority);
  }

  const getUsers = async () => {
    const users = await request("http://127.0.0.1:8080/allUsers", "GET");
    setUsers(users);
  }

  const getSubTasks = async () => {
    const subTasks = await request("http://127.0.0.1:8080/getSubtasks", "POST", JSON.stringify({ id: data.id }))
    setSubTasks(subTasks);
  };
  const saveEdit = async () => {
    let update = { ...form };
    update.priority = update.priority.id
    update.status = update.status.id
    update.author = update.author.id
    update.employee = update.employee.id
    await request("http://127.0.0.1:8080/alterTask", "POST", JSON.stringify({ ...update }))
    setData({ ...form })
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
    const status = await request("http://127.0.0.1:8080/getStatus", "GET");
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
          return item.alias === "work" || item.alias == 'closed' ? item : null;
        })
        setNextStatus(next)
        break
      default:
        next = status.filter(item => {
          return item.alias === 'work' || item.alias == "closed" ? item : null;
        })
        setNextStatus(next)
        break
    }
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

  if (!showDetail) {
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
                  <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskName} onChange={(e) => setForm({ ...form, taskName: e.target.value })}></input>
                  : data.taskName
              }
            </Modal.Title>
            <Modal.Title className="col-6">
              {
                edit ? "" :
                  nextStatus ?
                    <div>
                      {/* {console.log(nextStatus)} */}
                      <button type="button" className="btn btn-secondary m-1"
                        onClick={(e) => { setForm({ ...form, status: nextStatus[0] }); saveEdit() }}>
                        {nextStatus[0]?.statusName}
                      </button>
                      <button type="button" className="btn btn-secondary m-1"
                        onClick={(e) => { setForm({ ...form, status: nextStatus[0] }); saveEdit() }}
                      >
                        {nextStatus[1]?.statusName}
                      </button>
                    </div>
                    : ""
              }
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div>
            {edit ? "" : <p>Статус: {form.status.statusName}</p>}
          </div>
          <div>
            {
              edit ?
                <div className="m-1 col-6">
                  <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskDesc} onChange={(e) => setForm({ ...form, taskDesc: e.target.value })}></input>
                </div>
                : <h4>Описание: {data.taskDesc}</h4>
            }
          </div>
          <div>
            {
              edit ?
                <div className="m-1 col-6">
                  <input type="date" className="form-control" id="nameOfTask" placeholder="" value={form.begDate} onChange={(e) => setForm({ ...form, begDate: e.target.value })}></input>
                </div>
                : <p>Дата начала: {data.begDate}</p>
            }
          </div>
          <div>
            {
              edit ?
                <div className="m-1 col-6">
                  <input type="date" className="form-control" id="nameOfTask" placeholder="" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}></input>
                </div>
                : <p>Дата окончания: {data.endDate}</p>
            }
          </div>
          <div>
            {
              edit ?
                <div className="m-1 col-6">
                  <input type="input" className="form-control" id="expdate"
                    value={form.employee.userName}
                    onFocus={(e) => searchListUserVisible(e.target.value, true)}
                    onChange={(e) => {
                      if (users.length < 1) { getUsers(); }
                      setForm({ ...form, employee: { userName: e.target.value } });
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
                              setForm({ ...form, employee: { id: user.id, userName: user.userName } });
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
                : <p>Исполнитель: {data.employee.userName}</p>
            }
          </div>
          <div>
            {
              edit ? "" : <p>Автора: {data.author.userName}</p>
            }
          </div>
          <div>
            {edit ?
              <div className="m-1 col-6">
                <div className="d-flex">
                  <input type="input" className="form-control priotity-style" id="prioDir" readOnly={true}
                    value={form.priority.priorityName}
                    onFocus={(e) => {
                      if (priority.length < 1) { getPriority(); }
                    }}
                    onClick={e => {
                      setListPriority(!listPriority);
                      setToggle(!toggle)
                    }}
                    onChange={(e) => {
                      setForm({ ...form, priority: { priorityName: e.target.value } })
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
              : <p>Приоритет: {data.priority.priorityName}</p>
            }
            <div>
              {
                edit ? "" :
                  data.files ?
                    data.files.map((file, index) => {
                      return <a href="#" key={file.id} onClick={e => { getFile(index,file.fileName) }}>{file.fileName}</a>
                    })
                    : ""
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <div className="d-flex justify-content-between">
              <div className="col-2 d-flex row">
                {subTasks.length > 0 ?
                  subTasks.map((item, index) => {
                    return (<SubTask key={index} id={index} />)
                  }) : ""
                }
              </div>
              {data.author.id == userId ?
                <div>
                  {
                    edit ?
                      <div className="d-flex">
                        <div className="m-1">
                          <button type="button" className="btn btn-secondary" onClick={e => saveEdit()} >Сохранить</button>
                        </div>
                        <div className="m-1">
                          <button type="button" className="btn btn-secondary" onClick={e => setEdit(!edit)} >Отмена</button>
                        </div>
                      </div>
                      :
                      <button type="button" className="btn btn-secondary" onClick={e => setEdit(!edit)} >Редактировать</button>
                  }
                </div>
                : ""
              }
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  } else {
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
