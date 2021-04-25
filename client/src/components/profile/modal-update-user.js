import React, { useState, useEffect, Text } from "react";

import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { userActions } from "../../redux/user/action";


const ModalUpdateUser = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, error, request } = useHttp();

     const [userNameinf, setUserName] = useState("");
     const [firstNameinf, setFirstName] = useState("");
     const [lastnameinf, setLastName] = useState("");
     const [emailinf, setEmail] = useState("");
     const [userInfo, setUserInfo] = useState(0);
     const [roleinf, setRole] = useState("");


     const [form, setForm] = useState({
      id: null,
      userName: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined
  
    });


     useEffect(() => {
      getInfo();
  }, []);

    const getInfo = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      try {
          const body = [
              {
                  "id": userData.userId
              }

          ]

         
          const data = await request("http://127.0.0.1:8080/listUsers", "POST", JSON.stringify(body));
          const userInfo = data[0];
          setUserInfo(userInfo);
          console.log(userInfo);
          setEmail(userInfo.email);
          setFirstName(userInfo.firstName);
          setLastName(userInfo.lastName);
          setUserName(userInfo.userName);
          setForm({ ...form, id: userData.userId });
      } catch (error) {
          console.log(error);
      }
  };
  
  const sendForm = async () => {

    console.log(form);
    try {
        const data = await request("http://127.0.0.1:8080/alterUser", "POST", JSON.stringify({ ...form }));
    } catch (error) {
        console.log(error);
    }
    
  
    handleClose();
};



  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Редактировать профиль
        </Button>

      <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form className="d-flex row">
            <div className="form-group col-6">
              <label>Никнейм</label>
              <input type="value" className="form-control" id="userName" defaultValue = {userNameinf} onChange={(e) => setForm({ ...form, userName: e.target.value })}></input>            </div>
            <div className="form-group col-6">
              <label>Email</label>
              <input type="value" className="form-control" id="email" defaultValue = {emailinf} onChange={(e) => setForm({ ...form, email: e.target.value })}></input>            </div>
            <div className="form-group col-6">
              <label>Фамилия</label>
              <input type="value" className="form-control" id="lastName" defaultValue = {lastnameinf} onChange={(e) => setForm({ ...form, lastName: e.target.value })}></input>            </div>
            {/* <div className="form-group col-6">
              <label>Пароль</label>
              <input type="value" className="form-control" id="password" defaultValue = {} onChange={console.log("input")}></input>            </div> */}
            <div className="form-group col-6">
              <label>Имя</label>
              <input type="value" className="form-control" id="firstName" defaultValue = {firstNameinf} onChange={(e) => setForm({ ...form, firstName: e.target.value })}></input>            </div>
              
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleClose()}>
            Отмена
            </Button>
          <Button variant="success" onClick={() => sendForm()}>
            Добавить
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalUpdateUser