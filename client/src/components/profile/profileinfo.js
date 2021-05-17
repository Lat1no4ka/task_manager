import React, { useState, useEffect, Text } from "react";
import "./profileinf.scss";
import { useHttp } from "../../hooks/http.hook";
import { Row, Col, Alert, Container, Image, Button, Form} from "react-bootstrap";

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
     const [imageId, setImageId] = useState(null);
     const [imageLink, setImageLink] = useState(0);

     const [data, setData] = useState("");

     const [selectedFile, setSelectedFile] = useState();
     const [isSelected, setIsSelected] = useState(false);

     const [userId, setUserId] = useState("");

    useEffect(() => {
        
            getInfo();
        
    }, []);

    const addDefaultSrc = (ev) => {
        ev.target.src = "https://avtokadry.infoorel.ru/images/inc/noavatar.jpg" // this could be an imported image or url
      }
   

    //   const sendFile = async (userId, propImages) => {
    //     const formData = new FormData();
    //     propImages.forEach(file => {
    //         formData.append('file', file)
    //     });
    //     formData.append('userId', userId)
    //     const headers = { 'Access-Control-Allow-Credentials': 'true' }
    //     await request(`${process.env.REACT_APP_API_URL}/uploadFiles`, "POST", formData, headers)
    // }





	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = async (userId) => {

        if (imageId != null){
            console.log(imageId);
     
            // await request(`${process.env.REACT_APP_API_URL}/deletePicture`, "POST", JSON.stringify(imageId));
    

            await request(
                `${process.env.REACT_APP_API_URL}/deletePicture`, 'POST', JSON.stringify(imageId)
                
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }

		const formData = new FormData();

		formData.append('file', selectedFile);
        formData.append('userId', userId)
console.log(formData);
		await fetch(
			`${process.env.REACT_APP_API_URL}/uploadProfilePic`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
            getInfo();
	};

    

    const getInfo = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        try {
            
            const body = [
                {
                    "id": userData.userId
                }

            ]

            console.log(body);
            
            
            
            
            const data = await request(`${process.env.REACT_APP_API_URL}/listUsers`, "POST", JSON.stringify(body));
            const userInfo = data[0];
            setUserInfo(userInfo);
             
            setEmail(userInfo.email);
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setUserName(userInfo.userName);
            setUserId(userInfo.id);
            console.log(userId);
                const imagebody = 
                            {
                                "id": userInfo.picture.id
                            }

            setImageId(imagebody);

            const {link} = await request(`${process.env.REACT_APP_API_URL}/getProfilePic`, "POST", JSON.stringify(imagebody))
            setImageLink(link);

            if (userInfo.role.roleName == "admin") {
                setRole("Администратор");
            }
            else {
                setRole("Пользователь");
            }
        } catch (error) {
            console.log(error);
        }

       
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
                        
                        <div>
                            <br />
                            <h4>Изменить фото:</h4>
                            <input type="file" name="file" onChange={changeHandler} />
                            {isSelected ? (
                                <div>
                                    <br />
                                    <button onClick={() => handleSubmission(userId)}>Подтвердить</button>
                                </div>
                            ) : (
                                <p></p>
                            )}
                            
                            
                        </div>


                    </div>
                    <div className="d-flex justify-content-center">
                        <Container>
                            <Row>
                                <Col xs={22} md={11}>
                                <Image src={imageLink} alt="" onError={addDefaultSrc} thumbnail />
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
                        
                        <div>
                            <br />
            <h4>Изменить фото:</h4>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
                    <br />
                    <button onClick={() => handleSubmission(userId)}>Подтвердить</button>
                </div>
			) : (
				<p></p>
			)}
            
			
		</div>
                        
                        
                    </div>
                    <div className="d-flex justify-content-center">
                        <Container>
                            <Row>
                                <Col xs={22} md={11}>
                                <Image src={imageLink} alt="" onError={addDefaultSrc} thumbnail />
                                </Col>
                            </Row>
                            
                        </Container>
                        

                </div>
                
                    
                </div>
                        
            </div>

        );
    }
};

export default ProfileInfo;

