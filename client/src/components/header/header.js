import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  HouseDoor,
  CalendarWeek,
  PersonSquare,
  CardChecklist,
  Bell,
  Table,
  DoorOpen,
  PlusCircle,
} from "react-bootstrap-icons";
import { useAuth } from "../../hooks/auth.hook";

const Header = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
    history.push("/");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark">
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className=" container d-flex flex-row">
          <Nav.Link href="home">
            <HouseDoor size={28} />
          </Nav.Link>
          <Nav.Link href="calendar">
            <CalendarWeek size={28} />
          </Nav.Link>
          <Nav.Link href="profile">
            <PersonSquare size={28} />
          </Nav.Link>
          <Nav.Link href="statistic">
            <Table size={28} />
          </Nav.Link>
          <Nav.Link href="addTask">
            <PlusCircle size={28} />
          </Nav.Link>
          <Nav.Link href="">
            <DoorOpen size={28} onClick={(e) => { logoutHandler(e) }} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
