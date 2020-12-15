import React from "react";
import { Form,  ListGroup } from "react-bootstrap";

import "./sidebar.scss";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <h4>Фильтр</h4> 
        <br />
        <Form>


        <Form.Group>
          
        <Form.Control type="text" placeholder="Поиск по задачам" />

        
        </Form.Group>
        <Form.Group>
        <Form.Label>Статус задачи</Form.Label>
        <Form.Control as="select" >
        
          <option>Не выбрано</option>
        </Form.Control>

        
        </Form.Group>

        
      </Form>

      <br />
      <h4>История</h4> 
        <ListGroup variant="flush" style={{marginTop: '8px'}}>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Sidebar;
