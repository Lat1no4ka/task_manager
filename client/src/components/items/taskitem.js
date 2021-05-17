import React, { useState, useEffect } from "react";

import { PersonCircle } from "react-bootstrap-icons";
import { useHttp } from "../../hooks/http.hook";



import "./item.scss";

const TaskItem = (props) => {
  const [active, setActive] = useState(props.active);
  const [item, setItem] = useState(null);
  const [usersPicture, setUsersPicture] = useState([]);
  const { request } = useHttp();

  useEffect(() => {
    console.log("usersPicture")
    if (!usersPicture.length) {
      getUsersPicture()
    }
    if (props) {
      setItem(props.props);
    }
  }, []);

  const getUsersPicture = async () => {
    const response = await request(`${process.env.REACT_APP_API_URL}/getTaskUsers`, "POST", JSON.stringify({ id: props.props.id }))
    if (response.length) {
      await response.forEach(async user => {
        if (user.picture) {
          const picture = await request(`${process.env.REACT_APP_API_URL}/getProfilePic`, "POST", JSON.stringify({ id: user.picture.id }))
          usersPicture.push(picture)
          setUsersPicture(usersPicture);
        }
      });
    }
    props.setLoadinPic(true)
  }
  if (item) {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div className="task mt-5 p-3">
          <div className="task-header">
            <p>{item.taskName}</p>
          </div>
          <div className="task-body">{item.taskDesc}</div>
          <hr size="3" color="#000" />
          <div className="task-foother d-flex">
              {usersPicture.length ?
                usersPicture.map((picture, index) => {
                  return picture ? <img className="avatar" src={picture.link} key={index}></img> : <PersonCircle size={28} className="mr-3" />
                })
                : null
              }
            <div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default TaskItem;
