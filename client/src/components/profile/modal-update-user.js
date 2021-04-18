import React, { useState, useEffect, Text } from "react";

import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { userActions } from "../../redux/user/action";
import ProfileInfo from  "./profileinfo";

const ModalUpdateUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, error, request } = useHttp();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",

  });

  
  const sendForm = async () => {
    console.log(form);
    try {
        const data = await request("http://127.0.0.1:8080/alterUser", "POST", JSON.stringify({ ...form }));
    } catch (error) {
        console.log(error);
    }
    console.log(typeof(form.role.id));
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
              <input type="value" className="form-control" id="userName" placeholder="" onChange={console.log("input")}></input>            </div>
            <div className="form-group col-6">
              <label>Email</label>
              <input type="value" className="form-control" id="email" placeholder="" onChange={console.log("input")}></input>            </div>
            <div className="form-group col-6">
              <label>Фамилия</label>
              <input type="value" className="form-control" id="lastName" placeholder="" onChange={console.log("input")}></input>            </div>
            <div className="form-group col-6">
              <label>Пароль</label>
              <input type="value" className="form-control" id="password" placeholder="" onChange={console.log("input")}></input>            </div>
            <div className="form-group col-6">
              <label>Имя</label>
              <input type="value" className="form-control" id="firstName" placeholder="" onChange={console.log("input")}></input>            </div>
              
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleClose()}>
            Отмена
            </Button>
          <Button variant="success" onClick={() => handleClose()}>
            Добавить
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalUpdateUser