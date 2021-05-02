import React, { useState, useEffect, Text } from "react";
import "./profileinf.scss";
import { useHttp } from "../../hooks/http.hook";
import { Row, Col, Alert, Container, Image} from "react-bootstrap";

import ModalCreateUser from "./modal-create-user"
import ModalUpdateUser from "./modal-update-user";

const ProfileInfo = () => {

     const { loading, error, request } = useHttp();

     const [userNameinf, setUserName] = useState("");
     const [firstNameinf, setFirstName] = useState("");
     const [lastnameinf, setLastName] = useState("");
     const [emailinf, setEmail] = useState("");
     const [userInfo, setUserInfo] = useState(0);
     const [roleinf, setRole] = useState("");


     const [data, setData] = useState("");

    useEffect(() => {
        getInfo();
    }, []);


    const getImage = async () => {
        try{

            console.log("полностью объект", userInfo);
        console.log("переходим в picture", userInfo.picture);
        const imageId = [
            {
                "id": userInfo.picture.id
            }

        ]
  console.log("идём в id, но тут...",imageId);
         const imagelink = await request("http://127.0.0.1:8080/getProfilePic", "POST", JSON.stringify(imageId));      
         console.log(imagelink);
     
    }
    catch (error) {
        console.log(error);
    }
 };
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
            setEmail(userInfo.email);
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setUserName(userInfo.userName);
            if (userInfo.role.roleName == "admin") {
                setRole("Администратор");
            }
            else {
                setRole("Пользователь");
            }
        } catch (error) {
            console.log(error);
        }
        getImage();
    };
    if (userInfo?.role?.roleName == "admin") {
        return (

            <div className="profileForm">

                <div className="d-flex justify-content-center">

                    <div className="container p-5 ">
                        <div>
                            <h3>Никнейм: {userNameinf}</h3>
                        </div>
                        <div>
                            <h4>ФИО: {firstNameinf} {lastnameinf}</h4>
                        </div>
                        <div>
                            <p>Почтовый адрес: {emailinf}</p>
                        </div>
                        <div>
                            <p>Роль: Администратор</p>
                        </div>
                        <div className="form-group">
                            <ModalCreateUser />

                        </div>
                        <div className="form-group">
                            <ModalUpdateUser/>

                        </div>
                        
                    </div>
                    <div className="d-flex justify-content-center">
                        <Container>
                            <Row>
                                <Col xs={22} md={11}>
                                <Image src="https://avatarko.ru/img/kartinka/1/Crazy_Frog.jpg"  thumbnail />
                                </Col>
                            </Row>
                        </Container>
                </div>
                </div>
            </div>

        );
    }
    else {
        return (

            <div className="profileForm">

                <div className="d-flex justify-content-center">

                    <div className="container p-5 ">
                        <div>
                            <h3>Никнейм: {userNameinf}</h3>
                        </div>
                        <div>
                            <h4>ФИО: {firstNameinf} {lastnameinf}</h4>
                        </div>
                        <div>
                            <p>Почтовый адрес: {emailinf}</p>
                        </div>
                        <div>
                            <p>Роль: Пользователь</p>
                        </div>
                        <div className="form-group">
                            <ModalUpdateUser/>

                        </div>

                    </div>

                </div>

            </div>

        );

    }
};

export default ProfileInfo;

