import React from "react";
import TaskItem from "../items/taskitem";
import Sidebar from "../sidebar/sidebar";
import { ClockHistory, Sliders } from "react-bootstrap-icons";
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      block:""
    }
    this.iconClick = this.iconClick.bind(this)
  }

  iconClick(param) {
    if(param === this.state.block || !this.state.active){
      this.setState(state => ({
        active: !this.state.active,
        block:param
      }));
    }else{
      this.setState(state => ({
        active: this.state.active,
        block:param
      }));
    }
    
  }
  

  render() {
    return (
      <div className="d-flex">
        <div className="container col-9">
          <div className="d-flex mt-3 justify-content-end">
            <div className="m-2"onClick={() => this.iconClick('history')}>
              <ClockHistory size={28} className="icon"/>
            </div>
            <div className="m-2" onClick={() => this.iconClick('filter')}>
              <Sliders size={28} className="icon" />
            </div>
          </div>
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
          <Sidebar display={this.state.active} block={this.state.block}/>
      </div>
    );
  }
}

export default Home;
