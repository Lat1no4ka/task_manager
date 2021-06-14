import { useState, useEffect } from "react";
import { Chat } from "../chat/Chat"
import "./sidebar.scss";

export const SideBar = (props) => {
  const [asc, setAsc] = useState(false)

  const sortedByDate = () => {
    const tasks = props.tasks.sort((a, b) => {
      return -1
    })
    props.setSorted(!props.sorted)
    props.setTasks(tasks)
  }
  
  if (props.showChat) {
    return (
      <div className="sidebar-show col-6 p-2" >
        <Chat tasks={props.tasks} />
      </div>
    )
  } else if (props.showFilter) {
    return (
      <div className="sidebar-show" >
        <div className="d-flex flex-column">
          <label className="m-1 col-6">Выбрать только:</label>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('new')}>Новые</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('work')}>В работе</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('check')}>На проверке</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('revision')}>На доработке</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('accepted')}>Принятые</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('closed')}>Закрытые</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('overdue')}>Просроченные</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('archived')}>В архиве</button>
          <button type="button" className="btn btn-secondary col-6 m-1" onClick={e => props.setStatus('return')}>Сброс</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-none">
        <Chat tasks={props.tasks} />
      </div>
    )
  }
}