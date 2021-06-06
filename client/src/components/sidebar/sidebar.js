import { useState, useEffect } from "react";
import { Chat } from "../chat/Chat"
import "./sidebar.scss";

export const SideBar = (props) => {
  const [asc, setAsc] = useState(false)

  const sortedByDate = () => {
    const tasks = props.tasks.sort((a,b) => {
      return -1
    })
    props.setSorted(!props.sorted)
    props.setTasks(tasks)
  }
  const filterByStatus = (status) => {
    const tasks = props.tasks.filter((task) => {
      return task.status.alias == status ? task : null
    })
    props.setTasks(tasks)
  }

  if (props.showChat) {
    return (
      < div className="sidebar-show col-6 p-2" >
        <Chat  tasks={props.tasks}/>
      </div>
    )
  } else if (props.showFilter) {
    return (
      <div className="sidebar-show" >
        <div className="d-flex flex-column">
          <label className="m-1 col-6">Сортировать по:</label>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => sortedByDate()}>Дате</button>
          <button type="button" className="btn btn-secondary col-6 m-1">Исполнителям</button>
          <button type="button" className="btn btn-secondary col-6 m-1">Статусу</button>
        </div>

        <div className="d-flex flex-column">
          <label className="m-1 col-6">Выбрать только:</label>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => filterByStatus('new')}>Новые</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => filterByStatus('work')}>В работе</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => filterByStatus('closed')}>Закрытые</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-none">
        <Chat  tasks={props.tasks}/>
      </div>
    )
  }
}