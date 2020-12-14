import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  CalendarWeek,
  PersonSquare,
  CardChecklist,
  Sliders,
  Bell,
  Table,
  ClockHistory,
  DoorOpen,
} from "react-bootstrap-icons";
class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className=" m-auto w-50 justify-content-around">
            <Nav.Link href="#pricing">
              {" "}
              <CalendarWeek size={28} />{" "}
            </Nav.Link>
            <Nav.Link href="#test">
              <PersonSquare size={28} />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <CardChecklist size={28} />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <Sliders size={28} />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <Bell size={28} />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <Table size={28} />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <ClockHistory size={28} />
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
