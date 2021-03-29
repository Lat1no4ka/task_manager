import React, { useState, useEffect, Text } from "react";
import "./profileinf.scss";
import { useHttp } from "../../hooks/http.hook";


const ProfileInfo = () => {

    const { loading, error, request } = useHttp();


    useEffect(() => {
        getInfo();
      }, []);

    const getInfo = async () => {
        try {

          //const data = await request("http://127.0.0.1:8080/sendUsersId", "POST", JSON.stringify());
          //console.log(data);
          //setData(data);
        } catch (error) {
          console.log(error);
        }
      };

   



    return (

        <div className="d-flex justify-content-center">
            
                <div className="container p-5 ">
                    <div>
                        <h3>data.firstName</h3>
                    </div>
                    <div>
                        <h4>Описание: data.taskdesc</h4>
                    </div>
                    <div>
                        <p>Дата начала: data.begdate</p>
                    </div>
                    <div>
                        <p>Дата окончания: data.expdate</p>
                    </div>
                    <div>
                        <p>Участники: data.empid</p>
                    </div>
                    <div>
                        <p>Приоритет: data.taskpriorityid</p>
                    </div>
                    <div>
                        <p>Статус: data.taskstatusid</p>
                    </div>
                    <div>
                        <p>Задание назначил: data.headid</p>
                    </div>
                </div>
            </div>
        

    );
};

export default ProfileInfo;

