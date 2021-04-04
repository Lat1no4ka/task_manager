import React, { useState, useEffect, Text } from "react";

import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { userActions } from "../../redux/user/action";

const ModalCreateUser = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const { loading, error, request } = useHttp();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState({
      current: ""
    })
    
      


    const [form, setForm] = useState( {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      role: {
              id: 1,
              rolename: "user"
          }

    });
    const sendForm = async () => {
      console.log(form);
      // try {
        //dispatch(userActions.setUser(form));
        const test = {
          userName: "Userq111",
          password: "user",
          firstName: "Sergey",
          lastName: "Kylebyaka",
          email: "kyleb@gmail.com",
          role: {
                  id: 1,
                  rolename: "user"
              }
          
      }
          console.log("FROM form: ", form)
          const testJSON = JSON.stringify(test)
          console.log("testjson", testJSON);
          console.log("1");
          request("http://127.0.0.1:8080/registerUser", "POST", testJSON)
         
          //console.log("FORM");
          //console.log(form)
          
          /*
          .then(() => {
            dispatch(userActions.setUser(form));
                }); 
              } catch (error) {
                  console.log(error);
              }
          };
          */
        // } catch (error) {
        //   console.log("ERROR")
        //   console.log(error);
        // }
        handleClose();
        }
         
          const cacheUserForm = (e, param) => {
            e.preventDefault();
            dispatch(userActions.setUser(param))
        }


           const addUser = (e) => {
            e.preventDefault();
            user.push(form);
            sendForm();
        }

        const handlerInputChange = async  (e) => {
          const target = e.target;

          const value = target.value;
          const name = target.name;

    

          console.log("value", value);
          await setForm({
            ...form,
            [name]: value
          })
          console.log("form", form);
        }


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
            
            <form className="d-flex row">
                <div className="form-group col-6">
                    <label>Никнейм</label>
                    <input type="value" className="form-control" id="userName" placeholder="" value={form.userName} onChange={(e) => setForm({...form, userName: e.target.value})}></input>
                </div>
                <div className="form-group col-6">
                    <label>Email</label>
                    <input type="value" className="form-control" id="email" placeholder="" value={form.email} onChange={(e) => setForm( { ...form, email: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Фамилия</label>
                    <input type="value" className="form-control" id="lastName" placeholder="" value={form.lastName} onChange={(e) => setForm( { ...form, lastName: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Пароль</label>
                    <input type="value" className="form-control" id="password" placeholder="" value={form.password} onChange={(e) => setForm( { ...form, password: e.target.value })}></input>
                </div>
                <div className="form-group col-6">
                    <label>Имя</label>
                    <input type="value" className="form-control" id="firstName" placeholder="" value={form.firstName} onChange={(e) => setForm( { ...form, firstName: e.target.value })}></input>
                </div>
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
  

  export default ModalCreateUser