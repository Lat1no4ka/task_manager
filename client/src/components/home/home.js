import React from "react";
import TaskItem from "../items/taskitem";
class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="col-4">
              <TaskItem />
            </div>
            <div className="col-4">
              <TaskItem />
            </div>
            <div className="col-4">
              <TaskItem />
            </div>
            <div className="col-4">
              <TaskItem />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
