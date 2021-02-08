import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  CalendarWeek,
  PersonSquare,
  CardChecklist,
  Bell,
  Table,
  DoorOpen,
  PlusCircle,
} from "react-bootstrap-icons";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className=" m-auto w-50 justify-content-around">
          <Nav.Link href=" calendar">
            <CalendarWeek size={28} />
          </Nav.Link>
          <Nav.Link href=" profile">
            <PersonSquare size={28} />
          </Nav.Link>
          <Nav.Link href=" list">
            <CardChecklist size={28} />
          </Nav.Link>
          <Nav.Link href=" bell">
            <Bell size={28} />
          </Nav.Link>
          <Nav.Link href=" table">
            <Table size={28} />
          </Nav.Link>
          <Nav.Link href="addTask">
            <PlusCircle size={28} />
          </Nav.Link>
          <Nav.Link href="">
            <DoorOpen size={28} onClick={(e) => {logoutHandler(e)}} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
