import React from "react";
import { Form, ListGroup } from "react-bootstrap";

import "./sidebar.scss";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      show: "",
      close: "",
      block: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.display !== state.active || props.block !== state.block) {
      return {
        close: "sidebar-close",
        active: props.display,
        show: "sidebar",
        block: props.block,
      };
    }
    return null;
  }

  render() {
    if (this.state.block === "history") {
      return (
        <div className={this.state.active ? this.state.show : this.state.close}>
          <div>
            <ListGroup className="list-item">
              <ListGroup.Item>No style</ListGroup.Item>
              <ListGroup.Item variant="primary">Primary</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      );
    } else if (this.state.block === "filter") {
      return (
        <div className={this.state.active ? this.state.show : this.state.close}>
          <Form.Group>
            <Form.Control as="select">
              <option>Default select 1</option>
              <option>Default select 2</option>
              <option>Default select 3</option>
              <option>Default select 4</option>
              <option>Default select 5</option>
            </Form.Control>
          </Form.Group>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default SideBar;
