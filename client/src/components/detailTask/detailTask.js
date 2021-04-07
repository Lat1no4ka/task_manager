import "./detail.scss";
import { useHttp } from "../../hooks/http.hook";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { DetailSubTaskCreate as DetailSubTask } from "./detailTask"
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
  const data = props.data;
  const { request } = useHttp();
  const [subTasks, setSubTasks] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedSubTaskId, setSelectedSubTaskId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    id: data.id,
    taskName: data.taskName,
    taskDesc: data.taskDesc,
    begDate: data.begDate,
    endDate: data.endDate,
    priority: data.priority,
    employee: data.employee,
    files: "",
    status: data.status,
    author: data.author,
  })
 
  useEffect(() => {
    getSubTasks();
  }, [])

  const getSubTasks = async () => {
    const subTasks = await request("http://127.0.0.1:8080/getSubtasks", "POST", JSON.stringify({ id: data.id }))
    setSubTasks(subTasks);
  };
  const saveEdit = async () => {
    let update = {...form};
    update.priority = update.priority.id
    update.status = update.status.id
    update.author = update.author.id
    update.employee = update.employee.id
    await request("http://127.0.0.1:8080/alterTask", "POST", JSON.stringify({...update}))
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
  if (!showDetail) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between w-100">
            <Modal.Title>
              {
                edit ?
                  <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskName} onChange={(e) => setForm({ ...form, taskName: e.target.value })}></input>
                  : data.taskName
              }
            </Modal.Title>
            <Modal.Title>
              {
                edit ?
                  <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.status.statusName} onChange={(e) => setForm({ ...form, status: { statusName: e.target.value } })}></input>
                  : data.status.statusName
              }
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            {
              edit ?
                <div className="m-1 w-50">
                  <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.taskDesc} onChange={(e) => setForm({ ...form, taskDesc: e.target.value })}></input>
                </div>
                : <h4>Описание: {data.taskDesc}</h4>
            }
          </div>
          <div>
            {
              edit ?
                <div className="m-1 w-50">
                  <input type="date" className="form-control" id="nameOfTask" placeholder="" value={form.begDate} onChange={(e) => setForm({ ...form, begDate: e.target.value })}></input>
                </div>
                : <p>Дата начала: {data.begDate}</p>
            }
          </div>
          <div>
            {
              edit ?
                <div className="m-1 w-50">
                  <input type="date" className="form-control" id="nameOfTask" placeholder="" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}></input>
                </div>
                : <p>Дата окончания: {data.endDate}</p>
            }
          </div>
          <div>
            {
              edit ?
                <div className="m-1 w-50">
                  <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.employee.userName} onChange={(e) => setForm({ ...form, employee: { userName: e.target.value } })}></input>
                </div>
                : <p>Исполнитель: {data.employee.userName}</p>
            }
          </div>
          <div>
            {edit ?
              <div className="m-1 w-50">
                <input type="value" className="form-control" id="nameOfTask" placeholder="" value={form.priority.priorityName} onChange={(e) => setForm({ ...form, priority: { priorityName: e.target.value } })}></input>
              </div>
              : <p>Приоритет: {data.priority.priorityName}</p>
            }
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
