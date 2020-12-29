import React, { useState, useEffect } from "react";

import { PersonCircle } from "react-bootstrap-icons";



import "./item.scss";

const TaskItem = (props) => {
  const [active, setActive] = useState(props.active);
  const [item, setItem] = useState(null);
  const useItem = useEffect(() => {
    if (props) {
      setItem(props.props);
    }
  });
  if (item) {
    return (
      <div >
        <div className="task mt-5 p-3">
          <div className="task-header">
            <p>{item.title}</p>
          </div>
          <div className="task-body">{item.description}</div>
          <hr size="3" color="#000" />
          <div className="task-foother d-flex">
            <div title={item.members}>
              <PersonCircle size={28} className="mr-3" />
            </div>
            <div title={item.members}>
              <PersonCircle size={28} className="mr-3" />
            </div>
            <div title={item.members}>
              <PersonCircle size={28} className="mr-3" />
            </div>
            <div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default TaskItem;
