import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  CalendarWeek,
  PersonSquare,
  CardChecklist,
  Bell,
  Table,
  DoorOpen,
} from "react-bootstrap-icons";
class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className=" m-auto w-50 justify-content-around">
            <Nav.Link href="#calendar">
              <CalendarWeek size={28} />
            </Nav.Link>
            <Nav.Link href="#profile">
              <PersonSquare size={28} />
            </Nav.Link>
            <Nav.Link href="#list">
              <CardChecklist size={28} />
            </Nav.Link>
            <Nav.Link href="#bell">
              <Bell size={28} />
            </Nav.Link>
            <Nav.Link href="#table">
              <Table size={28} />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <DoorOpen size={28} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
