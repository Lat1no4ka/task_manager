import React, { useState, useEffect } from "react";
import { SideBar } from "../sidebar/sidebar";
import { DetailTask } from "../detailTask/detailTask";
import { useHttp } from "../../hooks/http.hook";
import { ChatDots, Sliders } from "react-bootstrap-icons";
import { useSelector } from "react-redux"
import "./home.scss";

// const TaskBoard = () => {
//   const { request } = useHttp();
//   const [sorted, setSorted] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [tasksForFilter, setTasksForFilter] = useState([]);
//   const [taskNum, setTaskNum] = useState(null);
//   const [showDetail, setShowDetail] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const id = useSelector(auth => auth.auth.userId)
//   const [loadinPic, setLoadinPic] = useState(false)

//   const getTask = async () => {
//     const tasks = await request(`${process.env.REACT_APP_API_URL}/getTasks`, "POST", JSON.stringify({ id }))
//     setTasks(tasks);
//     setTasksForFilter(tasks);
//   };

//   useEffect(() => {
//     getTask();
//   }, [loadinPic]);



//   return (
//     <div className="d-flex" style={{ backgroundImage:`url("https://krot.info/uploads/posts/2020-10/thumbs/1603493783_38-p-foni-s-krasivimi-ikonkami-43.png")`, position: 'absolute', width: '100%', height: '100%'}}>
//       <div className="container">
//         <div className="d-flex mt-3 justify-content-end">
//           <div className="m-2">
//             <ChatDots size={28} className="icon" onClick={e => {
//               setShowChat(!showChat)
//               setShowFilter(false)
//             }} />
//           </div>
//           <div className="m-2">
//             <Sliders size={28} className="icon" onClick={e => {
//               setShowFilter(!showFilter)
//               setShowChat(false)
//             }} />
//           </div>
//         </div>
//         <div className="d-flex justify-content-start flex-wrap">
//           {

//             tasks.map((item, index) => {
//               return (
//                 <div key={item.id} className="col-4" onClick={(e) => { setTaskNum(index); setShowDetail(true) }}>
//                   <TaskItem props={item} setLoadinPic={setLoadinPic} style={{ backgroundColor: 'blue' }} />
//                 </div>
//               );
//             })
//           }
//         </div>
//       </div>
//       {showDetail ?
//         <DetailTask
//           data={tasks[taskNum]}
//           show={showDetail} onHide={() => setShowDetail(false)}
//         /> : null}
//       <SideBar showChat={showChat} showFilter={showFilter} tasks={tasksForFilter} setTasks={setTasks} setSorted={setSorted} sorted={sorted} />
//     </div>

//   );
// };

// export default TaskBoard;


export const TaskBoard = () => {

  const userId = useSelector(auth => auth.auth.userId)
  const { request, loading } = useHttp();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    const users = await request(`${process.env.REACT_APP_API_URL}/getParentTasks`, "POST", JSON.stringify({ id: userId }))
    setUsers(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
  }, [selectedUserId])

  const userTasks = () => {
    const currentUser = users.find((user) => {
      return user.id == selectedUserId ? user : null
    })
    return currentUser.tasks
  }

  return (
    <div className="container">
      <div className="input-group mt-2">
        <input type="search" className="form-control" placeholder="Поиск" value={search} onChange={e => setSearch(e.target.value)}></input>
      </div>
      {selectedUserId ? <div className="m-2"><button type="button" class="btn btn-secondary" onClick={e => setSelectedUserId(null)}>Назад</button></div> : null}
      <div className="d-flex flex-wrap justify-content-start">
        {!selectedUserId && users ? <UsersFolders users={users} setSelectedUserId={setSelectedUserId} search={search} /> : null}
        {selectedUserId ? <UserTasks user={[selectedUserId, setSelectedUserId]} tasks={userTasks()} /> : null}
      </div>
    </div>
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
        <div className="folder col-3 m-2" key={user.id} onClick={e => setSelectedUserId(user.id)}>
          <div className="folder_header">
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="folder_body">

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

  return (
    <>
      {
        tasks.map((task) => {
          return (
            <div className="col-3 p-2" key={task.id} >
              <div className="task" onClick={e => { setSelectedTask(task); setShowDetail(true) }}>
                <div className="task_header">
                  <p>{task.taskName}</p>
                  <p>Статус: {task.status.statusName}</p>
                </div>
                <div className="task_body">

                </div>
                <div className="task_footer">

                </div>
              </div>
            </div>
          );
        })
      }
      {selectedTask ? <DetailTask data={selectedTask} show={showDetail} onHide={() => setShowDetail(false)} /> : null}
    </>
  )
}