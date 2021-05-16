import "./detail.scss";
import { useHttp } from "../../hooks/http.hook";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DetailTask as DetailSubTask } from "./detailTask"
import { CaretDownFill, ChatDots } from 'react-bootstrap-icons';
import { PrivateChat } from '../chat/privateChat'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
          <p className="desc">Исполнитель: {data.employee.userName}</p>
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
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [priority, setPriority] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [searchListUser, setSearchListUser] = useState(false);
  const [listPriority, setListPriority] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [file, setFile] = useState(null)
  const [openChat, setOpenChat] = useState(false)
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
    setEdit(!edit)
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
                      <button type="button" className="btn btn-secondary m-1"
                        onClick={(e) => { setForm({ ...form, status: nextStatus[0] }); saveEdit(nextStatus[0]) }}>
                        {nextStatus[0]?.statusName}
                      </button>
                      <button type="button" className="btn btn-secondary m-1"
                        onClick={(e) => { setForm({ ...form, status: nextStatus[0] }); saveEdit(nextStatus[1]) }}
                      >
                        {nextStatus[1]?.statusName}
                      </button>
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
              {
                edit ?
                  <div className="m-1 col-6">
                    {console.log(form)}
                    <Typeahead
                      clearButton
                      labelKey="name"
                      id="selections-example"
                      defaultSelected={[{ id: data.employee.id ?? "", name: data.employee.userName ?? "" }]}
                      onChange={(user, e) => { setForm({ ...form, employee: { id: user[0]?.id, userName: user[0]?.name } }) }}
                      options={users.length ? users : []}
                      placeholder="Назначить на"
                    />
                  </div>
                  : <p className="desc">Исполнитель: <span>{data.employee.firstName + " " + data.employee.lastName}</span></p>
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
                      {openChat ?
                        <PrivateChat setOpenChat={setOpenChat} private={true} data={data} />
                        :
                        <div className="">
                          {edit ? null :
                            <button type="button" className="btn" onClick={e => setOpenChat(true)}>
                              <ChatDots size={30} />
                            </button>
                          }
                        </div>
                      }
                      {openChat ? null :
                        <div>
                          <button type="button" className="btn btn-secondary" onClick={e => setEdit(!edit)} >Редактировать</button>
                        </div>
                      }
                    </div>
                }
              </div>
              : null
            }
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
