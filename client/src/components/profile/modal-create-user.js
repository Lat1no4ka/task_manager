import React, { useState, useEffect, Text } from "react";

import { Button, Modal } from 'react-bootstrap';
import { Cursor, Eye } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { userActions } from "../../redux/user/action";

const defaultUserData = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: {
    id: 1
  }

}

const ModalCreateUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, error, request } = useHttp();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState(defaultUserData);
  const [showPass, setShowPass] = useState(false);

  const sendForm = async () => {
    try {
      const data = await request(`${process.env.REACT_APP_API_URL}/registerUser`, "POST", JSON.stringify({ ...form }));
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setForm({ ...defaultUserData })
  };




  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Создать пользователя
      </Button>

      <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Регистрация нового пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form className="d-flex row needs-validation" onSubmit={() => sendForm()}>
            <div className="form-group col-6">
              <label >Логин</label>
              <input required type="value" className="form-control" id="userName" placeholder="" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })}></input>            </div>
            <div className="form-group col-6">
              <label>Email</label>
              <input required type="value" className="form-control" id="email" placeholder="" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}></input>            </div>
            <div className="form-group col-6">
              <label>Фамилия</label>
              <input required type="value" className="form-control" id="lastName" placeholder="" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}></input>            </div>
            <div className="form-group col-6">
              <label>Пароль</label>
              <div className="input-group">
                <input required type={showPass ? "text" : "password"} pattern=".{8,}" className="form-control" id="password" placeholder="" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}></input>
                <span className="input-group-text" style={{ cursor: "pointer" }} id="basic-addon2"
                  onMouseUp={e => setShowPass(false)} onMouseDown={e => setShowPass(true)}><Eye size={20} /></span>
              </div>
            </div>
            <div className="form-group col-6">
              <label>Имя</label>
              <input required type="value" className="form-control" id="firstName" placeholder="" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}></input>            </div>
            <div className="form-group col-6">
              <label htmlFor="select">Роль:</label>
              <select required className="form-control" id="role" placeholder="" value={form.role.id} onChange={(e) => setForm({ ...form, role: { id: Number(e.target.value) } })}>
                <option value={1}>Пользователь</option>
                <option value={2}>Администратор</option>
              </select>
            </div>
            <div className="d-flex justify-content-end col-12">
              <input className="btn btn-secondary m-1" type="submit" value="Создать" ></input>
              <input className="btn btn-secondary m-1" type="button" value="Отмена" onClick={() => handleClose()}></input>
            </div>
          </form>

        </Modal.Body>
      </Modal>
    </>
  );
}


export default ModalCreateUser