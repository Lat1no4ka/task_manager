import React from "react";

import { PersonCircle } from 'react-bootstrap-icons';
import "./item.scss";


class TaskItem extends React.Component {
  render() {
    return (
    <div>
        <div className="task mt-5 p-3">
            <div className="task-header">
                <p>task 1</p>
            </div>
            <div className="task-body">
                task desk
            </div>
            <hr size="3" color="#000"/>
            <div className="task-foother">
                <PersonCircle size={28} className="mr-3"/>
                <PersonCircle size={28} className="mr-3"/>
                <PersonCircle size={28} className="mr-3"/>
                <PersonCircle size={28} className="mr-3"/>
            </div>
        </div>
    </div>
    );
}
}

export default TaskItem;
