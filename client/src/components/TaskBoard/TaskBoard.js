import React, { useState, useEffect } from "react";
import TaskItem from "../items/taskitem";
import SideBar from "../sidebar/sidebar";
import { DetailTask } from "../detailTask/detailTask";
import { useHttp } from "../../hooks/http.hook";
import { ClockHistory, Sliders } from "react-bootstrap-icons";
import { useSelector } from "react-redux"
import "./home.scss";

const TaskBoard = () => {
  const { request } = useHttp();
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(false);
  const [taskNum, setTaskNum] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [block, setBlock] = useState("");
  const id = useSelector(auth => auth.auth.userId)

  const getTask = async () => {
    const tasks = await request("http://127.0.0.1:8080/getTasks", "POST", JSON.stringify({ id }))
    setTasks(tasks);
  };

  const iconClick = (param) => {
    if (param === block || !active) {
      setActive(!active);
      setBlock(param);
    } else {
      setActive(active);
      setBlock(param);
    }
  };

  useEffect(() => {
    getTask();
  }, []);



  return (
    <div className="d-flex"  style={{ backgroundImage: `url("http://localhost:8080/getImage/ad1cb822-94e6-4911-a02c-4400e9e30c3d")` }}>
      <div className="container col-9">
        <div className="d-flex mt-3 justify-content-end">
          <div className="m-2" onClick={() => iconClick("history")}>
            <ClockHistory size={28} className="icon" />
          </div>
          <div className="m-2" onClick={() => iconClick("filter")}>
            <Sliders size={28} className="icon" />
          </div>
        </div>
        <div className="d-flex justify-content-start flex-wrap">
          {

            tasks.map((item, index) => {
              return (
                <div  key={item.id} className="col-4" onClick={(e) => { setTaskNum(index); setShowDetail(true) }}>
                  <TaskItem props={item} style={{backgroundColor: 'blue'}}/>
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
        /> : ""}
      <SideBar display={active} block={block} />
    </div>

  );
};

export default TaskBoard;
