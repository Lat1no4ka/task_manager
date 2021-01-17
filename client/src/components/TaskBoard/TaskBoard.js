import React, { useState, useEffect } from "react";
import TaskItem from "../items/taskitem";
import Sidebar from "../sidebar/sidebar";
import { DetailTask } from "../detailTask/detailTask";
import { useHttp } from "../../hooks/http.hook";
import { ClockHistory, Sliders } from "react-bootstrap-icons";
import "./home.scss";

const TaskBoard = () => {
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const { loading, error, request } = useHttp();
  const [active, setActive] = useState(false);
  const [taskActive, setTaskActive] = useState(false);
  const [block, setBlock] = useState("");
  const tasks = async () => {
    try {
      const data = await request("/json/tasks.json", "GET"); // без тела запроса т к он не хочет отдавать json
      setData(data);
    } catch (error) {
      console.log(error);
    }
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
  const effect = useEffect(() => {
    if (!data) {
      tasks();
    }
  });

  const detailTaskHandler = (item) => {
    setTaskActive(!taskActive);
    setDetail(item);
  };
  return (
    <div className="d-flex">
      <div className="container col-9">
        <div className="d-flex mt-3 justify-content-end">
          <div className="m-2" onClick={() => iconClick("history")}>
            <ClockHistory size={28} className="icon" />
          </div>
          <div className="m-2" onClick={() => iconClick("filter")}>
            <Sliders size={28} className="icon" />
          </div>
        </div>
        {taskActive && (
          <div className="d-flex justify-content-center">
            <DetailTask data={detail} />
          </div>
        )}
        <div className="d-flex justify-content-between flex-wrap">
          {data &&
            data.map((item) => {
              return (
                <div className="col-4" onClick={() => detailTaskHandler(item)}>
                  <TaskItem key={item.id} props={item} actvie={taskActive} />
                </div>
              );
            })}
        </div>
      </div>
      <Sidebar display={active} block={block} />
    </div>
  );
};

export default TaskBoard;
