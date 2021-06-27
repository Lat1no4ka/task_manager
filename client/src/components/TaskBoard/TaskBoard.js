import React, { useState, useEffect } from "react";
import { SideBar } from "../sidebar/sidebar";
import { Chat } from "../chat/Chat";
import { DetailTask } from "../detailTask/detailTask";
import { useHttp } from "../../hooks/http.hook";
import { ChatText, Sliders } from "react-bootstrap-icons";
import { useSelector } from "react-redux"
import "./home.scss";

export const TaskBoard = () => {

  const userId = useSelector(auth => auth.auth.userId)
  const { request, loading } = useHttp();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [myTask, setMytask] = useState(false);
  const [dateTime, setDateTime] = useState(new Date);
  const [status, setStatus] = useState("return");
  const [taskSearch, setTaskSearch] = useState("")

  const getUsers = async () => {
    const users = await request(`${process.env.REACT_APP_API_URL}/getParentTasks`, "POST", JSON.stringify({ id: userId }))

    setUsers(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    getUsers()
  }, [dateTime, status])

  useEffect(() => {
  }, [selectedUserId])

  const userTasks = () => {
    const currentUser = users.find((user) => {
      return user.id == selectedUserId ? user : null
    })

    const tasks = currentUser.tasks.filter((task) => {
      return task.status.alias == status ? task : null
    })
    if (status == 'return') {
      return currentUser.tasks.filter((task) => {
        return task.status.alias != "archived" ? task : null
      })
    }
    return tasks
  }

  const getTaskAsRoom = () => {
    let allTasks = []
    const userTasks = users.length ? users.map(user => {
      user.tasks.forEach((task) => {
        allTasks.push(task)
      })
    }) : []

    return allTasks
  }

  const filterUser = () => {
    return users.filter(user => {
      return myTask ?
        userId == user.id ? user : null
        : userId != user.id ? user : null
    })
  }


  return (
    <div className="d-flex">
      <div className="container">
        <div className="d-flex">
          <div className=" mt-2 mr-2">
            {!selectedUserId ? <input type="button" onClick={e => setMytask(true)}
              className={myTask ? "btn btn-success" : "btn btn-secondary"} value={"Назначенные для меня"}></input>
              : <input type="button" class="btn btn-secondary" onClick={e => setSelectedUserId(null)} value="Назад"></input>
            }
          </div>
          <div className=" mt-2 mr-2">
            {!selectedUserId ? <input type="button" onClick={e => setMytask(false)}
              className={myTask ? "btn btn-secondary" : "btn btn-success"} value={"Поставленные мной"}></input>
              : null
            }
          </div>
          <div className="input-group mt-2 col-4 p-0">
            <input type="search" className="form-control" placeholder="Поиск" value={!selectedUserId ? search : taskSearch}
              onChange={e => { !selectedUserId ? setSearch(e.target.value) : setTaskSearch(e.target.value) }}
            >
            </input>
          </div>
          <div className="d-flex mt-2 justify-content-end col-2">
            <div className="mr-2">
              <ChatText size={42} className="icon" onClick={e => {
                setShowChat(!showChat)
                setShowFilter(false)
              }} style={{ background: 'white', borderRadius: '50% 50% 10px 6px ' }} />
            </div>
            <div className="mr-2">
              <Sliders size={42} className="icon" onClick={e => {
                setShowFilter(!showFilter)
                setShowChat(false)
              }} style={{ background: 'white', borderRadius: '0px' }} />
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-start">
          {!selectedUserId && users.length ? <UsersFolders users={filterUser()} setSelectedUserId={setSelectedUserId} search={search} /> : null}
          {selectedUserId ? <UserTasks user={[selectedUserId, setSelectedUserId]} users={users} setDateTime={setDateTime} tasks={userTasks()} taskSearch={taskSearch} /> : null}
        </div>
      </div>
      {users.length ? <SideBar showChat={showChat} setStatus={setStatus} tasks={getTaskAsRoom()} showFilter={showFilter} /> : null}
    </div >
  )
};

export const UsersFolders = (props) => {
  const users = props.users;
  const search = props.search;
  const setSelectedUserId = props.setSelectedUserId

  const serachUser = (user = "") => {
    return (user.firstName.toUpperCase().includes(search.toUpperCase()) ||
      user.lastName.toUpperCase().includes(search.toUpperCase()))
      ? user : null
  }

  return (
    users.filter(user => serachUser(user)).map((user) => {
      return (
        <div className="folder col-3 m-2" key={user.id} onClick={e => setSelectedUserId(user.id)} style={{ background: 'white' }}>
          <div className="folder_header p-2">
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="folder_body p-2">
            <p>
              Задач: {user.tasks.filter((task) => { return task.status.alias != 'archived' ? task : null }).length}
            </p>
          </div>
          <div className="folder_footer">

          </div>
        </div>
      )
    })
  )
}

export const UserTasks = (props) => {
  const tasks = props.tasks;
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    props.setDateTime(new Date())

  }, [showDetail])

  useEffect(() => {
    updateSelecedTask()
  }, [tasks])

  const statusStyle = (color) => {
    return {
      height: "30px",
      backgroundColor: color,
    }
  }

  const updateSelecedTask = () => {
    const task = tasks.find((task) => {
      return selectedTask?.id == task.id ? task : null;
    })
    setSelectedTask(task)
  }

  const serachTask = (task = "") => {

    return task.taskName.toUpperCase().includes(props.taskSearch.toUpperCase())
      ? task : null
  }

  return (
    <>
      {
        tasks.filter((task) => serachTask(task)).map((task) => {
          return (
            <div className="col-3 p-2" key={task.id} onClick={e => { setSelectedTask(task); setShowDetail(true); }} >
              <div className="task" style={{ background: 'white' }}>
                <div className="task_header" style={statusStyle(task.status.statusColor)}>
                  <p className="p-0 m-0">Статус: {task.status.statusName}</p>
                </div>
                <div className="task_body">
                  <p>{task.taskName}</p>
                </div>
                <div className="task_footer">
                  <p>Дата начала: {task.begDate}</p>
                  <p>Дата окончания: {task.endDate}</p>
                </div>
              </div>
            </div>
          );
        })
      }
      {selectedTask ? <DetailTask data={selectedTask} show={showDetail} users={props.users} setDateTime={props.setDateTime} onHide={() => setShowDetail(false)} /> : null}
    </>
  )
}
