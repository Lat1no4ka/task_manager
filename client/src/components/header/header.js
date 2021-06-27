import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  HouseDoor,
  CalendarWeek,
  PersonSquare,
  Table,
  DoorOpen,
  PlusCircle,
} from "react-bootstrap-icons";
import { useAuth } from "../../hooks/auth.hook";

const Header = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const [hover, setHover] = useState("")
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
    history.push("/");
    window.location.reload();
  };

  const getUserName = () => {
    const userName = JSON.parse(localStorage.getItem("userData")).data
    return `${userName.lastName} ${userName.firstName}`
  }
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark">
      <Navbar.Brand href="#home" style={{ maxWidth: "200px", whiteSpace: "normal" }} >{getUserName()}</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className=" container d-flex flex-row">
          <Nav.Link href="home" style={{ maxHeight: "45px", textAlign: "center", minWidth: "90px", maxWidth: "90px" }}
            onMouseOver={e => setHover("Главная")} className="mb-2" onMouseLeave={e => setHover("")}>
            <HouseDoor size={28} />
            <p className="p-0 m-0" >{hover == 'Главная' ? hover : ""}</p>
          </Nav.Link>
          <Nav.Link href="calendar" style={{ maxHeight: "45px", textAlign: "center", minWidth: "90px", maxWidth: "90px" }}
            onMouseOver={e => setHover("Календарь")} className="mb-2" onMouseLeave={e => setHover("")}>
            <CalendarWeek size={28} />
            <p className="p-0 m-0" >{hover == 'Календарь' ? hover : ""}</p>
          </Nav.Link>
          <Nav.Link href="profile" style={{ maxHeight: "45px", textAlign: "center", minWidth: "90px", maxWidth: "90px" }}
            onMouseOver={e => setHover("Профиль")} className="mb-2" onMouseLeave={e => setHover("")}>
            <PersonSquare size={28} />
            <p className="p-0 m-0" >{hover == 'Профиль' ? hover : ""}</p>
          </Nav.Link>
          <Nav.Link href="statistic" style={{ maxHeight: "45px", textAlign: "center", minWidth: "90px", maxWidth: "90px" }}
            onMouseOver={e => setHover("Статистика")} className="mb-2" onMouseLeave={e => setHover("")}>
            <Table size={28} />
            <p className="p-0 m-0" >{hover == 'Статистика' ? hover : ""}</p>
          </Nav.Link>
          <Nav.Link href="addTask" style={{ maxHeight: "45px", textAlign: "center", minWidth: "90px", maxWidth: "90px" }}
            onMouseOver={e => setHover("Задачи")} className="mb-2" onMouseLeave={e => setHover("")}>
            <PlusCircle size={28} />
            <p className="p-0 m-0" >{hover == 'Задачи' ? hover : ""}</p>
          </Nav.Link>
          <Nav.Link onClick={(e) => { logoutHandler(e) }}  href="" style={{ maxHeight: "45px", textAlign: "center", minWidth: "90px", maxWidth: "90px" }}
            onMouseOver={e => setHover("Выход")} className="mb-2" onMouseLeave={e => setHover("")}>
            <DoorOpen size={28}/>
            <p className="p-0 m-0" >{hover == 'Выход' ? hover : ""}</p>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
