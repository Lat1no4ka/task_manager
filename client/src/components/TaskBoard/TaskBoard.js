import React, { useState, useEffect } from "react";
import TaskItem from "../items/taskitem";
import { SideBar } from "../sidebar/sidebar";
import { DetailTask } from "../detailTask/detailTask";
import { useHttp } from "../../hooks/http.hook";
import { ChatDots, Sliders } from "react-bootstrap-icons";
import { useSelector } from "react-redux"
import "./home.scss";

const TaskBoard = () => {
  const { request } = useHttp();
  const [sorted, setSorted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasksForFilter, setTasksForFilter] = useState([]);
  const [taskNum, setTaskNum] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const id = useSelector(auth => auth.auth.userId)
  const [loadinPic, setLoadinPic] = useState(false)

  const getTask = async () => {
    const tasks = await request(`${process.env.REACT_APP_API_URL}/getTasks`, "POST", JSON.stringify({ id }))
    setTasks(tasks);
    setTasksForFilter(tasks);
  };

  useEffect(() => {
    getTask();
  }, [loadinPic]);



  return (
    <div className="d-flex" style={{ backgroundImage:`url("https://krot.info/uploads/posts/2020-10/thumbs/1603493783_38-p-foni-s-krasivimi-ikonkami-43.png")`, position: 'absolute', width: '100%', height: '100%'}}>
      <div className="container">
        <div className="d-flex mt-3 justify-content-end">
          <div className="m-2">
            <ChatDots size={28} className="icon" onClick={e => {
              setShowChat(!showChat)
              setShowFilter(false)
            }} />
          </div>
          <div className="m-2">
            <Sliders size={28} className="icon" onClick={e => {
              setShowFilter(!showFilter)
              setShowChat(false)
            }} />
          </div>
        </div>
        <div className="d-flex justify-content-start flex-wrap">
          {

            tasks.map((item, index) => {
              return (
                <div key={item.id} className="col-4" onClick={(e) => { setTaskNum(index); setShowDetail(true) }}>
                  <TaskItem props={item} setLoadinPic={setLoadinPic} style={{ backgroundColor: 'blue' }} />
                </div>
              );
            })
          }
        </div>
      </div>
      {showDetail ?
        <DetailTask
          data={tasks[taskNum]}
          show={showDetail} onHide={() => setShowDetail(false)}
        /> : null}
      <SideBar showChat={showChat} showFilter={showFilter} tasks={tasksForFilter} setTasks={setTasks} setSorted={setSorted} sorted={sorted} />
    </div>

  );
};

export default TaskBoard;
