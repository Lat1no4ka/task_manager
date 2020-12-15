import React from "react";
import Header from "./components/header/header"
import Home from "./components/home/home";
import Sidebar from "./components/sidebar"

import "./App.scss";

import {Row, Col} from 'react-bootstrap'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
            
        <Row style={{height: '100%'}}>
        <Col><Home/></Col>
        

        <Col xs lg="3" style={{height: '100%'}}>
          <Sidebar />
        </Col>
        </Row>

       
      </div>
    );
  }
}

export default App;
