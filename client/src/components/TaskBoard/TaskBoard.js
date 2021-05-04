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
  const [tasks, setTasks] = useState([]);
  const [taskNum, setTaskNum] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const id = useSelector(auth => auth.auth.userId)

  const getTask = async () => {
    const tasks = await request("http://127.0.0.1:8080/getTasks", "POST", JSON.stringify({ id }))
    setTasks(tasks);
  };

  useEffect(() => {
    getTask();
  }, []);



  return (
    <div className="d-flex" style={{ backgroundImage: `url("http://localhost:8080/getImage/ad1cb822-94e6-4911-a02c-4400e9e30c3d")` }}>
      <div className="container">
        <div className="d-flex mt-3 justify-content-end">
          <div className="m-2">
            <ChatDots size={28} className="icon" onClick={ e => {
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
                  <TaskItem props={item} style={{ backgroundColor: 'blue' }} />
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
      <SideBar showChat={showChat} showFilter={showFilter}/>
    </div>

  );
};

export default TaskBoard;
