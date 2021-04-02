import React, { useState, useEffect, Text } from "react";
import "./profileinf.scss";
import { useHttp } from "../../hooks/http.hook";

import ModalCreateUser from "./modal-create-user"


const ProfileInfo = () => {

    const { loading, error, request } = useHttp();

    const [userNameinf, setUserName] = useState("");
    const [firstNameinf, setFirstName] = useState("");
    const [lastnameinf, setLastName] = useState("");
    const [emailinf, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState(0);
    const [roleinf, setRole] = useState("");

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





            console.log(body)
            const data = await request("http://127.0.0.1:8080/sendUsersId", "POST", JSON.stringify(body));
            const userInfo = data[0];
            //console.log("userInfo", userInfo);
            setUserInfo(userInfo);
            //setData(data);
            //console.log (userInfo.role.rolename); 
            setEmail(userInfo.email);
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setUserName(userInfo.userName);
            if (userInfo.role.rolename == "admin") {
                setRole("Администратор");
            }
            else {
                setRole("Пользователь");
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log("userInfo",userInfo);
    if (userInfo?.role?.rolename == "admin"){
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
                        <p>Роль: {roleinf}</p>
                    </div>
                    <ModalCreateUser />
                    <div className="form-group">
                        <button type="button" className="btn btn-secondary" onClick={() => console.log("создание")}>Создать пользователя</button>
                    </div>

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
                            <p>Роль: {roleinf}</p>
                        </div>
                        
    
                    </div>
    
                </div>
    
            </div>
    
        );

    }
};

export default ProfileInfo;

